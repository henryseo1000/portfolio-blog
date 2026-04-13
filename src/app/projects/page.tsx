import { allPagesForProject } from "@/api/search/route";
import DataSetter from "@/components/common/DataSetter";
import GraphView from "@/components/projects/GraphView";
import { ProjectSource } from "@/types/projectTypes";
import generateGraphData from "@/utils/generateGraphData";
import { Metadata } from "next";

export default async function Projects() {
    const projectSource : ProjectSource = await allPagesForProject();
    const graphData = generateGraphData(projectSource);

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