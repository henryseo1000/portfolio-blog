import React from 'react'
import { div } from 'three/src/nodes/math/OperatorNode.js'

interface ProjectCardProps {
    title? : string,
    description? : string,
    tagList? : string[],
    onClick? : () => void
}

function ProjectCards({title = "", description, tagList = [""], onClick} : ProjectCardProps) {
  return (
    <div 
        className="flex flex-col justify-center h-[170px] px-[30px] ml-[20px] py-[20px] gap-[10px] border-[1px] border-[var(--border-dark)] rounded-[10px] bg-[var(--background-basic)] cursor-pointer hover:opacity-80"
        onClick={onClick !== undefined ? onClick : () => {}}
    >
        <div className='w-[340px] text-[20px] font-bold whitespace-nowrap text-ellipsis overflow-hidden'>
            {title}
        </div>

        <p className='w-[340px] text-[var(--border-light-dark)] line-clamp-2 overflow-hidden text-ellipsis '>
            {description && description}
        </p>

        <div className='flex gap-[10px]'>
            {
                tagList.map((item, index) => {
                    return (
                        <p
                            className='px-[10px] py-[5px] border-[0.5px] text-[11px] font-light border-solid border-[var(--foreground-rgb)] rounded-[20px]'
                            key={index}
                        >
                            {item}
                        </p>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ProjectCards