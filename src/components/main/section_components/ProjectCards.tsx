'use client';

import ProjectProps from '@/types/projectTypes';

function ProjectCards({title = "", description, tagList = [""], onClick} : ProjectProps) {

    return (
        <div 
            className="flex flex-col justify-center h-[170px] px-[30px] ml-[20px] py-[20px] gap-[10px] border-[1px] border-[var(--border-dark)] rounded-[10px] bg-[var(--background-basic)] cursor-pointer hover:opacity-80"
            onClick={onClick ? onClick : () => {}}
        >
            <div className='w-[340px] text-[20px] font-bold whitespace-nowrap text-ellipsis overflow-hidden'>
                {title}
            </div>

            <div className='flex gap-[5px]'>
                {
                    tagList.map((item, index) => {
                        return (
                            <p
                                className='px-[8px] py-[3px] border-[0.5px] text-[11px] font-light border-solid border-[var(--foreground-rgb)] rounded-[20px]'
                                key={index}
                            >
                                {item}
                            </p>
                        )
                    })
                }
            </div>

            <p className='w-[340px] text-[var(--border-light)] line-clamp-2 overflow-hidden text-ellipsis'>
                {description && description}
            </p>
        </div>
    )
}

export default ProjectCards