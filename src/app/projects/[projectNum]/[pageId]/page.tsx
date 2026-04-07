import GraphView from "@/components/projects/GraphView"

async function ProjectPost({ params }) {
    const slug = await params
    
    return <GraphView/>
}

export default ProjectPost