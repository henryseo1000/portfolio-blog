import { getPagelistByProject } from '@/api/search/route';
import DataSetter from '@/components/common/DataSetter';
import PostCard from '@/components/common/PostCard';
import projectsList from '@/data/project';
import { Link2 } from 'lucide-react';
import Link from 'next/link';

async function ProjectPage({ params }) {
    const slug = await params;
    const source = await getPagelistByProject(slug.projectNum);

    return (
        <div className='flex flex-col w-screen px-[50px] pt-[100px] gap-[30px]'>
            <div className='flex flex-col gap-[10px]'>
                <p className='text-[24px] font-extrabold'>
                    {projectsList[Number(slug.projectNum) - 1].title}
                </p>
                <p className='text-[15px] text-[var(--border-light)]'>
                    {projectsList[Number(slug.projectNum) - 1].description}
                </p>
                <div className='flex gap-[10px] text-[15px] font-thin text-[var(--border-light)]'>
                    {(projectsList[Number(slug.projectNum) - 1].gitRepo || projectsList[Number(slug.projectNum) - 1].link) && <Link2 strokeWidth={1}/>}
                    {projectsList[Number(slug.projectNum) - 1].gitRepo && 
                        <Link
                            className='cursor-pointer hover:text-[var(--foreground-rgb)]'
                            href={projectsList[Number(slug.projectNum) - 1].gitRepo}
                        >
                            Git Repo
                        </Link>
                    }
                    {projectsList[Number(slug.projectNum) - 1].link && 
                        <Link
                            className='cursor-pointer hover:text-[var(--foreground-rgb)]'
                            href={projectsList[Number(slug.projectNum) - 1].link}
                        >
                            프로젝트 링크
                        </Link>
                    }
                </div>
                
            </div>

            <div className='grid grid-cols-3 gap-[30px] mb-[50px]'>
                {
                    source?.list && source.list.map((item, index) => {
                        return (
                            <PostCard
                                key={index}
                                title={item?.title}
                                thumbnailPath={projectsList[Number(slug.projectNum) - 1].thumbnailPath}
                                pageId={item?.pageId}
                                type={item?.type}
                                path={`/projects/${item?.projectNum}/${item.pageId}`}
                            />
                        )
                    })
                }
            </div>
            <DataSetter 
                path={`projects/${slug.projectNum}`}
                storeDataList={source?.list}
            />
        </div>
    )
}

export default ProjectPage;