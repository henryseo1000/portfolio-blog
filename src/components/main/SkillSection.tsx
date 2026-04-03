import React, { MutableRefObject } from 'react'

function SkillSection({ref} : {ref: MutableRefObject<HTMLDivElement>}) {
  return (
    <div ref={ref} className='w-screen h-screen bg-[var(--background-basic)]'>
      SkillSection
    </div>
  )
}

export default SkillSection