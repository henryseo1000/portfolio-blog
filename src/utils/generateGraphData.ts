
import { GraphLink, GraphNode } from "@/types/graphTypes";
import { ProjectSource } from "@/types/projectTypes";

const generateGraphData = (source : ProjectSource) => {
    const nodes : GraphNode[] = [];
    const links : GraphLink[] = [];
    const tagsSet = new Set<string>();

    if (source?.list) {
        source.list.forEach((item) => {
            nodes.push({
                id: item.pageId,
                label: item.title,
                group: 'post',
                projectNum: item.projectNum
            })

            item.type.forEach(tag => {
                tagsSet.add(tag)
                links.push({ source: item.pageId, target: tag })
            })
        })
    }

    tagsSet.forEach(tag => {
        nodes.push({ id: tag, label: `#${tag}`, group: 'tag' })
    })

    return {nodes: nodes, links: links}
}

export default generateGraphData;