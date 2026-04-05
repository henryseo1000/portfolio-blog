export default interface postCategoryProps {
    title: string;
    icon: React.ReactNode;
    database_id?: string;
    path?: string;
    childDatabase?: postCategoryProps[];
}