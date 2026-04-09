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
import projectsList from "@/data/project";

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

export async function notionToPage(path: string, postId: string) {
    const len = postCategoryList.length;
    const notionClient = new Client({ auth: process.env.NOTION_TOKEN });

    for ( let i = 0; i < len; i++ ) {
        if (postCategoryList[i].path === path) {
            const dbObject = await notionClient.databases.retrieve({ database_id:  postCategoryList[i].database_id })
            .then(async (data) => {
                if ((data as any).data_sources[0]) {
                    const response = await notionClient.dataSources.query({
                        data_source_id: (data as any).data_sources[0]?.id,
                        "sorts": [
                            {
                                "timestamp": "created_time",
                                "direction": "ascending"
                            },
                        ]
                    })
                    return response;
                }
                else {
                    return {}
                }
            })

            if((dbObject as any).results) {
                let next = {}
                let prev = {}
                let foundIdx = 0;

                const filteredList = (dbObject as any).results?.find((item, index) => {
                    if (item?.id.replace("-", "") === postId.replace("-", "")) {
                        foundIdx = index;
                        return true;
                    }
                    else {
                        false;
                    }
                })

                if (filteredList) {
                    const totalNum = (dbObject as any).results.length;

                    const n2m = new NotionConverter(notionClient).withRenderer(
                        new MDXRenderer({
                            frontmatter: true
                        }),
                    );

                    const source = (await n2m.convert(filteredList.id)).content;
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

                    if (foundIdx < totalNum - 1) {
                        if ((dbObject as any).results[foundIdx + 1]) {
                            const keyArr = Object.keys((dbObject as any).results[foundIdx + 1].properties)

                            if(keyArr.length > 0) {
                                const titleKey = keyArr.find((key) => {return (dbObject as any).results[foundIdx + 1].properties[key].type === "title"});

                                next = {
                                    title: (dbObject as any).results[foundIdx + 1]?.properties[titleKey].title[0].plain_text,
                                    pageId: (dbObject as any).results[foundIdx + 1]?.id
                                }
                            }
                        }
                    }
                    
                    if (foundIdx > 0) {
                        const keyArr = Object.keys((dbObject as any).results[foundIdx - 1].properties)

                        if (keyArr.length > 0) {
                            const titleKey = keyArr.find((key) => {return (dbObject as any).results[foundIdx - 1].properties[key].type === "title"});

                            prev = {
                                title: (dbObject as any).results[foundIdx - 1]?.properties[titleKey].title[0].plain_text,
                                pageId: (dbObject as any).results[foundIdx - 1]?.id
                            }
                        }
                    }


                    return { 
                        content, 
                        frontmatter, 
                        totalNum: totalNum, 
                        nextPage: next, 
                        prevPage: prev, 
                        type: path 
                    }
                }
                
            }
        }
    }

    return {}
}

export async function getDatabasePagelist(path: string, input : string = "") {
    const len = postCategoryList.length;
    const notionClient = new Client({ auth: process.env.NOTION_TOKEN });

    for ( let i = 0; i < len; i++ ) {
        if (postCategoryList[i].path === path) {
            const dbObject = await notionClient.databases.retrieve({ database_id:  postCategoryList[i].database_id })
            .then(async (data) => {

                if ((data as any).data_sources[0]) {
                    const response = await notionClient.dataSources.query({
                        data_source_id: (data as any).data_sources[0]?.id,
                        "sorts": [
                            {
                                "timestamp": "created_time",
                                "direction": "ascending"
                            },
                        ]
                    })
                    console.log(response)
                    return response;
                }
            })

            if ((dbObject as any)?.results) {
                const buf = []
                const totalNum = (dbObject as any).results.length;
                (dbObject as any).results.map((item) => {
                    
                    if (item?.properties) {
                        const keyArr = Object.keys(item.properties)
                        const keyLen = keyArr.length

                        if (keyLen > 0) {
                            let titleKey = "";

                            for (let i = 0; i < keyLen; i++) {
                                if (item.properties[keyArr[i]].type === "title") {
                                    titleKey = keyArr[i];
                                    break;
                                }
                            }

                            buf.push({
                                title: item?.properties[titleKey].title[0].plain_text,
                                pageId: item?.id,
                                type: path,
                                thumbnailPath: postCategoryList[i].thumbnail
                            })
                        }
                    }
                })

                return { list : buf, totalNum: totalNum }
            }
        }
    }

    return {}
}

export async function getPageById (pageId: string) {
    const notionClient = new Client({ auth: process.env.NOTION_TOKEN });
    const n2m = new NotionConverter(notionClient).withRenderer(
    new MDXRenderer({
            frontmatter: true
        }),
    );

    const source = (await n2m.convert(pageId)).content;
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

    return { content, frontmatter }
}

export async function getPagelistByProject( projectNum : number ) {

    if (projectNum > projectsList.length) {
        return {};
    }

    const notionClient = new Client({ auth: process.env.NOTION_TOKEN });

    const dbObject = await notionClient.databases.retrieve({ database_id: "e975da6fc4f3451b958271228c983454" })
        .then(async (data) => {
            
            if ((data as any).data_sources[0]) {

                const response = await notionClient.dataSources.query({
                    data_source_id: (data as any).data_sources[0]?.id,
                    filter : {
                        'property': 'Project',
                        'relation': {'contains' : projectsList[Number(projectNum) - 1]?.uuid}
                    }
                })
                
                return response;
            }
        })
        
        
    if ((dbObject as any)?.results) {
        const buf = []
        const totalNum = (dbObject as any).results.length;

        (dbObject as any).results.map((item, index) => {
            
            if (item?.properties) {
                const keyArr = Object.keys(item.properties)
                        
                if (keyArr.length > 0) {
                    const titleKey = keyArr.find((key) => {return item.properties[key].type === "title"})

                    buf.push({
                        title: item?.properties[titleKey].title[0].plain_text,
                        pageId: item?.id,
                        type: path,
                        projectNum: projectNum
                    })
                }
            }
        })

        return { list : buf, totalNum: totalNum }
    }
    else {
        return {}
    }
}

export async function getAllPosts(input : string = "") {
    const len = postCategoryList.length;
    const notionClient = new Client({ auth: process.env.NOTION_TOKEN });
    const buf = []

    for ( let i = 0; i < len; i++ ) {
            const dbObject = await notionClient.databases.retrieve({ database_id:  postCategoryList[i].database_id })

            .then(async (data) => {

                if ((data as any).data_sources[0]) {
                    const response = await notionClient.dataSources.query({
                        data_source_id: (data as any).data_sources[0]?.id
                    })

                    return response;
                }
            })

            if ((dbObject as any)?.results) {
            
                (dbObject as any).results.map((item) => {
                    
                    if (item?.properties) {
                        const keyArr = Object.keys(item.properties)

                        if (keyArr.length > 0) {
                            const titleKey = keyArr.find((key) => {return item.properties[key].type === "title"})

                            buf.push({
                                title: item?.properties[titleKey].title[0].plain_text,
                                pageId: item?.id,
                                type: postCategoryList[i].path,
                                thumbnailPath: postCategoryList[i].thumbnail
                            })
                        }
                    }
                })
            }
    }

    return { list : buf, totalNum: buf.length }
}