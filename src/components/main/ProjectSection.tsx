import { MutableRefObject } from 'react';
import Marquee from "react-fast-marquee";
import ProjectCards from './section_components/ProjectCards';
import { useRouter } from 'next/navigation';
import MainButton from './section_components/MainButton';

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
              <ProjectCards 
                title="2024 개인 프로젝트 #1 - 동아리 도서 관리 인프라 제작"
                description='동아리 도서 관리 프로젝트입니다. 동아리 도서 관리 프로젝트입니다.동아리 도서 관리 프로젝트입니다.동아리 도서 관리 프로젝트입니다.동아리 도서 관리 프로젝트입니다.동아리 도서 관리 프로젝트입니다.동아리 도서 관리 프로젝트입니다.동아리 도서 관리 프로젝트입니다.'
                tagList={["웹", "백엔드", "Convex"]}
                onClick={() => {router.push('/projects')}}
              />
              <ProjectCards 
                title="2024 개인 프로젝트 #1 - 동아리 도서 관리 인프라 제작"
                description='동아리 도서 관리 프로젝트입니다. '
                tagList={["웹", "백엔드", "Convex"]}
                onClick={() => {router.push('/projects')}}
              />
              <ProjectCards 
                title="2024 개인 프로젝트 #1 - 동아리 도서 관리 인프라 제작"
                description='동아리 도서 관리 프로젝트입니다. '
                tagList={["웹", "백엔드", "Convex"]}
                onClick={() => {router.push('/projects')}}
              />
              <ProjectCards 
                title="2024 개인 프로젝트 #1 - 동아리 도서 관리 인프라 제작"
                description='동아리 도서 관리 프로젝트입니다. '
                tagList={["웹", "백엔드", "Convex"]}
                onClick={() => {router.push('/projects')}}
              />
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
              <ProjectCards 
                title="2024 개인 프로젝트 #1 - 동아리 도서 관리 인프라 제작"
                description='동아리 도서 관리 프로젝트입니다. 동아리 도서 관리 프로젝트입니다.동아리 도서 관리 프로젝트입니다.동아리 도서 관리 프로젝트입니다.동아리 도서 관리 프로젝트입니다.동아리 도서 관리 프로젝트입니다.동아리 도서 관리 프로젝트입니다.동아리 도서 관리 프로젝트입니다.'
                tagList={["웹", "백엔드", "Convex"]}
                onClick={() => {router.push('/projects')}}
              />
              <ProjectCards 
                title="2024 개인 프로젝트 #1 - 동아리 도서 관리 인프라 제작"
                description='동아리 도서 관리 프로젝트입니다. '
                tagList={["웹", "백엔드", "Convex"]}
                onClick={() => {router.push('/projects')}}
              />
              <ProjectCards 
                title="2024 개인 프로젝트 #1 - 동아리 도서 관리 인프라 제작"
                description='동아리 도서 관리 프로젝트입니다. '
                tagList={["웹", "백엔드", "Convex"]}
                onClick={() => {router.push('/projects')}}
              />
              <ProjectCards 
                title="2024 개인 프로젝트 #1 - 동아리 도서 관리 인프라 제작"
                description='동아리 도서 관리 프로젝트입니다. '
                tagList={["웹", "백엔드", "Convex"]}
                onClick={() => {router.push('/projects')}}
              />
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