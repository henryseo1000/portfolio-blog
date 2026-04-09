export default interface ProjectProps {
    title: string;
    description: string;
    tagList: string[];
    uuid?: string;
    thumbnailPath?: string;
    gitRepo?: string;
    link?: string;
    onClick?: () => void;
}