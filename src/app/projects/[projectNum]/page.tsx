import { getPagelistByProject } from '@/api/search/route';

async function ProjectPage({ params }) {
    const  slug  = await params.then(async (data) => {
        return await getPagelistByProject(data.projectNum);
    })

    return (
        <div className='flex flex-col w-screen h-screen'>
            {
                slug?.list && slug.list.map((item, index) => {
                    return (
                        <div key={index}>{item}</div>
                    )
                })
            }
        </div>
    )
}

export default ProjectPage;