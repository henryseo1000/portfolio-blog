import { allPagesForProject, getPagelistByProject } from "@/api/search/route";
import DataSetter from "@/components/common/DataSetter";
import GraphView from "@/components/projects/GraphView";
import projectsList from "@/data/project";
import { ProjectSource } from "@/types/projectTypes";
import generateGraphData from "@/utils/generateGraphData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dots - Projects',
  description: 'My projects with graph view',
}


export default async function Projects() {
    const projectSource : ProjectSource = await allPagesForProject();
    const graphData = generateGraphData(projectSource);
    console.log(projectSource)
    return (
        <div>
            <GraphView
                projects={projectSource?.list ? projectSource?.list : []} 
                initialNodes={graphData.nodes} 
                initialLinks={graphData.links}
            />
            <DataSetter
                path="projects"
                storeDataList={projectSource?.list ? projectSource?.list : []}
            />
        </div>
    )
}