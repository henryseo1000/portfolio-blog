import { getPageById } from "@/api/search/route"

import "./globals.css"
import parseFrontmatter from "@/utils/parseFrontmatter";

async function ProjectPost({ params }) {
    const slug = await params;
    const source = await getPageById(slug.pageId);
    
    return (
        <div className="flex flex-col pb-[50px] gap-[30px]">
            <div 
                className="flex flex-col px-[30px] pt-[110px] pb-[25px] gap-[5px]"
                style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/thumbnails/project-1-thumbnail.png")`
                    }}
            >
                {parseFrontmatter(source)}
            </div>

            <div className="flex flex-col px-[50px] gap-[15px]">
                {source.content && source.content}
            </div>
        </div>
    )
}

export default ProjectPost