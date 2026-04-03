import React, { MutableRefObject } from 'react'

function PostSection({ref} : {ref: MutableRefObject<HTMLDivElement>}) {
  return (
    <div ref={ref} className='w-screen h-screen bg-[var(--background-plain)]'>
        PostsSection
    </div>
  )
}

export default PostSection;