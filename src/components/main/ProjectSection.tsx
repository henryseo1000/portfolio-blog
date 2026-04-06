import { MutableRefObject } from 'react';
import Marquee from "react-fast-marquee";
import ProjectCards from './section_components/ProjectCards';
import { useRouter } from 'next/navigation';
import MainButton from './section_components/MainButton';
import projectsList from '@/data/project';

function ProjectSection({ref} : {ref: MutableRefObject<HTMLDivElement>}) {
  const router = useRouter();

  return (
    <div ref={ref} className='flex flex-col justify-center w-screen h-[calc(100vh_+_300px)] px-[100px] py-[200px] gap-[10px] bg-[var(--background-plain)]'>
      <p 
        data-aos="fade-top"
        className='text-[48px] font-extrabold'
      >
        Projects
      </p>

      <div
        className='flex flex-col items-center justify-center w-full h-full gap-[60px]'
      >
        <section 
            data-aos="fade-top"
            className='w-full'
          >
            <Marquee
              pauseOnHover
              gradient
              gradientColor={"#000000"}
            >
              {
                projectsList.map((item, index) => {
                  return (
                    <ProjectCards key={index} {...item} onClick={() => {router.push(`/projects/${index + 1}`)}}/>
                  )
                })
              }
          </Marquee> 
          </section>
          

        <section 
          data-aos="fade-bottom"
          className='w-full'
        >
          <Marquee
            pauseOnHover
            gradient
            gradientColor={"#000000"}
            direction='right'
          >
            {
              projectsList.map((item, index) => {
                return (
                  <ProjectCards key={index} {...item} onClick={() => {router.push(`/projects/${index + 1}`)}}/>
                )
              })
            }
          </Marquee> 
        </section>
      </div>  

      <div
        className='flex w-full justify-center'
        data-aos="fade-top"
      >
        <MainButton
          text="Projects"
          onClick={() => {
            router.push('/projects')
          }}
          style='opacity-30 hover:opacity-100'
        />
      </div>
    </div>
  )
}

export default ProjectSection;