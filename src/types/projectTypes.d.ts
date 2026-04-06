export default interface ProjectProps {
    title: string;
    description: string;
    tagList: string[];
    uuid?: string;
    onClick?: () => void;
}