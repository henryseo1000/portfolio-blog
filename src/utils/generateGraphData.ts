
import projectsList from "@/data/project";
import { GraphLink, GraphNode } from "@/types/graphTypes";
import { ProjectSource } from "@/types/projectTypes";

const generateGraphData = (source : ProjectSource) => {
    const nodes : GraphNode[] = [];
    const links : GraphLink[] = [];

    if (source?.list) {
        for (let i  = 0; i < projectsList.length; i++) {
            const tagsSet = new Set<string>();

            nodes.push({
                id: `project-${i + 1}`,
                label: projectsList[i].title,
                group: 'title',
                projectNum: i + 1
            })

            source?.list
            .filter((item) => {return item.projectNum === i + 1})
            .forEach((item) => {
                nodes.push({
                    id: item.pageId,
                    label: item.title,
                    group: 'post',
                    projectNum: item.projectNum
                })

                item.type.forEach(tag => {
                    tagsSet.add(tag)
                    links.push({ source: `${tag}-project-${i + 1}`, target: item.pageId })
                })

            })

            tagsSet.forEach(tag => {
                nodes.push({ id: `${tag}-project-${i + 1}`, label: `#${tag}`, group: 'tag' })
                links.push({ source: `project-${i + 1}`, target: `${tag}-project-${i + 1}` })
            })
        }
    }

    return {nodes: nodes, links: links}
}

export default generateGraphData;