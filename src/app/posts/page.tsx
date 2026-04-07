import { getAllPosts } from "@/api/search/route"

export default async function PostsPage() {
    const source = await getAllPosts();

    return (
        <div>
            {source.list.map((item, index) => {
                return(
                    <p key={index}>{item.title}</p>
                )
            })}
        </div>
    )
}