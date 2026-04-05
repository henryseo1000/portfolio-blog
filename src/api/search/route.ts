import { length } from './../../../node_modules/@types/three/src/Three.TSL.d';
import fs from "fs";
import path from "path";

import { compileMDX } from "next-mdx-remote/rsc";
import { Client } from '@notionhq/client';
import { NotionConverter } from 'notion-to-md';
import { MDXRenderer } from 'notion-to-md/plugins/renderer';

import remarkGfm from 'remark-gfm'
import rehypePrismPlus from "rehype-prism-plus"
import rehypeCodeTitles from "rehype-code-titles"
import { postCategoryList } from "@/data/postCategory";

const POST_FOLDER_NAME = "src/app/posts/database/(markdowns)";
const POSTS_DIRECTORY = path.join(process.cwd(), POST_FOLDER_NAME);

export function getFileNum() {
    return fs.readdirSync(POSTS_DIRECTORY).length;
};

export async function getMarkdown() {
    const source = fs.readFileSync(POSTS_DIRECTORY + "/1.md");

    const { content, frontmatter } = await compileMDX({
        source: source,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [[remarkGfm, { strict: true, throwOnError: true }]],
                rehypePlugins: [[rehypeCodeTitles], [rehypePrismPlus]]
            }
        }
    });

    return { content, frontmatter };
};

export async function notionToMarkdown() {
    const notionClient = new Client({ auth: process.env.NOTION_TOKEN });

    const n2m = new NotionConverter(notionClient).withRenderer(
        new MDXRenderer({
            frontmatter: true
        }),
    );

    const source = (await n2m.convert('9267c771895045d68b07f29473b53150')).content;
    const { content, frontmatter } = await compileMDX({
        source: source,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [[remarkGfm, { strict: true, throwOnError: true }]],
                rehypePlugins: [[rehypeCodeTitles], [rehypePrismPlus]]
            }
        },
    });

    return {content, frontmatter}
}

export async function notionToPage(path: string, postNum: number) {
    const len = postCategoryList.length;
    const notionClient = new Client({ auth: process.env.NOTION_TOKEN });

    for ( let i = 0; i < len; i++ ) {
        if (postCategoryList[i].path === path) {
            const dbObject = await notionClient.databases.retrieve({ database_id:  postCategoryList[i].database_id })
            .then(async (data) => {
                if ((data as any).data_sources[0]) {
                    const response = await notionClient.dataSources.query({
                        data_source_id: (data as any).data_sources[0]?.id
                    })
                    return response;
                }
                else {
                    return {}
                }
            })

            if((dbObject as any).results && (dbObject as any).results[postNum]?.id) {
                const totalNum = (dbObject as any).results.length;
                const n2m = new NotionConverter(notionClient).withRenderer(
                    new MDXRenderer({
                        frontmatter: true
                    }),
                );

                const source = (await n2m.convert((dbObject as any).results[postNum]?.id)).content;
                const { content, frontmatter } = await compileMDX({
                    source: source,
                    options: {
                        parseFrontmatter: true,
                        mdxOptions: {
                            remarkPlugins: [[remarkGfm, { strict: true, throwOnError: true }]],
                            rehypePlugins: [[rehypeCodeTitles], [rehypePrismPlus]]
                        }
                    },
                });

                return { content, frontmatter, totalNum: totalNum }
            }
        }
    }

    return {}
}