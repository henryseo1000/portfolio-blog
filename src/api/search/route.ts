import fs from "fs";
import path from "path";

import { compileMDX } from "next-mdx-remote/rsc";
import { Client } from '@notionhq/client';
import { NotionConverter } from 'notion-to-md';
import { MDXRenderer } from 'notion-to-md/plugins/renderer';

import remarkGfm from 'remark-gfm'
import rehypePrismPlus from "rehype-prism-plus"
import rehypeCodeTitles from "rehype-code-titles"

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
                rehypePlugins: [[rehypeCodeTitles],[rehypePrismPlus]]
            }
        }
    });

    return { content, frontmatter };
};

export async function notionToMarkdown() {

    const notionClient = new Client({ auth: process.env.NOTION_TOKEN });

    const n2m = new NotionConverter(notionClient).withRenderer(
        new MDXRenderer({
            frontmatter: true, // Enable frontmatter generation, default is false
        }),
    );

    const source = (await n2m.convert('9267c771895045d68b07f29473b53150')).content;
    const { content, frontmatter } = await compileMDX({
        source: source,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [[remarkGfm, { strict: true, throwOnError: true }]],
                rehypePlugins: [[rehypeCodeTitles],[rehypePrismPlus]]
            }
        },
    });

    console.log("front", frontmatter)

    return {content, frontmatter}
}