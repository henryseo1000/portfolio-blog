import React, { MutableRefObject } from 'react'

function PostSection({ref} : {ref: MutableRefObject<HTMLDivElement>}) {
  return (
    <div ref={ref} className='w-screen h-screen px-[100px] py-[50px] bg-[var(--background-plain)]'>
      <div 
        data-aos="fade-left"
        className='flex justify-end w-full gap-[10px] text-[48px] font-extrabold'
      >
        <p className=' '>Recent</p>
        <p className='text-transparent [-webkit-text-stroke:1px_var(--foreground-rgb)]'>Posts</p>
      </div>
    </div>
  )
}

export default PostSection;