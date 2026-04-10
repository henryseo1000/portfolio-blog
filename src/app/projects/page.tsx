import { getPagelistByProject } from "@/api/search/route";
import GraphView from "@/components/projects/GraphView";
import { ProjectSource } from "@/types/projectTypes";
import generateGraphData from "@/utils/generateGraphData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dots - Projects',
  description: 'My projects with graph view',
}


export default async function Projects() {
    const projectSource : ProjectSource = await getPagelistByProject(1);
    const graphData = generateGraphData(projectSource);

    console.log(projectSource.list)

    return (
        <div>
            <GraphView/>
        </div>
    )
}