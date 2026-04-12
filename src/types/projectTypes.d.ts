export interface ProjectProps {
    title: string;
    description: string;
    tagList: string[];
    uuid?: string;
    thumbnailPath?: string;
    gitRepo?: string;
    link?: string;
    onClick?: () => void;
    relatedPosts?: string[];
}

export interface ProjectSlug {
    title: string;
    pageId: string;
    type: Array<string>;
    date: string;
    projectNum: number;
}

export interface ProjectSource {
    list?: ProjectSlug[];
    totalNum?: number;
}