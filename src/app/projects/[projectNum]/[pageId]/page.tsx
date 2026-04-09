import { getPageById } from "@/api/search/route"

import "./globals.css"
import parseFrontmatter from "@/utils/parseFrontmatter";

async function ProjectPost({ params }) {
    const slug = await params;
    const source = await getPageById(slug.pageId);
    
    return (
        <div className="flex flex-col px-[50px] pb-[50px] py-[100px] gap-[30px]">
            <div className="flex flex-col gap-[5px]">
                {parseFrontmatter(source)}
            </div>

            <div className="flex flex-col gap-[15px]">
                {source.content && source.content}
            </div>
        </div>
    )
}

export default ProjectPost