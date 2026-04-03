import { MutableRefObject } from 'react';

function ProjectSection({ref} : {ref: MutableRefObject<HTMLDivElement>}) {
  return (
    <div ref={ref} className='w-screen h-screen bg-[var(--background-plain)]'>
        ProjectSection
    </div>
  )
}

export default ProjectSection;