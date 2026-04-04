import CareerProps from '@/types/careerTypes'
import React from 'react'

function CareeerCards({ title, tag, descriptionList } : CareerProps) {
  return (
    <div className='flex flex-col justify-center w-[500px] p-[20px] gap-[15px] border-[1px] border-solid rounded-[10px] bg-[rgba(255,255,255,0.2)] duration-300 hover:border-[var(--border-dark)] hover:bg-[rgba(255,255,255,0.1)]'>
        <p className='text-[24px] font-bold'>
            {title}
        </p>

        <div className='flex gap-[10px]'>
            {
                tag.map((item, index) => {
                    return (
                        <p 
                            className='max-w-fit p-[10px] text-[11px] border-[0.5px] border-solid border-[var(--foreground-rgb)] rounded-[20px]'
                            key={index}>{item}
                        </p>
                    )
                })
            }
        </div>

        <div className='flex flex-col gap-[10px]'>
            {
                descriptionList.map((item, index) => {
                    return (
                        <p key={index}>• {item}</p>
                    )
                })
            }
        </div>
    </div>
  )
}

export default CareeerCards