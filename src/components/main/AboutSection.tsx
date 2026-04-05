import { MutableRefObject } from 'react';

import Email from "../../../public/svg/email.svg";
import Github from "../../../public/svg/github.svg";
import Instagram from "../../../public/svg/instagram.svg";
import ArrowRightCircle from "../../../public/svg/arrowRightCircle.svg";
import { useRouter } from 'next/navigation';
import MainButton from './section_components/MainButton';

function AboutSection({ref} : {ref: MutableRefObject<HTMLDivElement>}) {
  const router = useRouter();
  const buttonList = [
    {
      svg: <Email/>,
      onClick: () => {}
    },
    {
      svg: <Github/>,
      onClick: () => {
        window.open('https://github.com/henryseo1000', '_self')
      }
    },
    {
      svg: <Instagram/>,
      onClick: () => {
        window.open("https://www.instagram.com/hojun_seo_0827/", "_self")
      }
    }
  ]

  return (
    <div ref={ref} className='flex flex-col w-screen h-screen px-[100px] py-[50px] gap-[30px] bg-[var(--background-basic)]' >
        <div 
          className='flex gap-[15px] text-[48px] font-extrabold'
          data-aos="fade-right"
        >
          <p>About</p>
          <p className='text-[rgba(0,0,0,0)] [-webkit-text-stroke:1px_var(--foreground-rgb)]'>Me</p>
        </div>

        <div data-aos="fade-top" className='flex w-full h-full items-center justify-between'>
          <div className='flex flex-col items-center justify-center w-full h-full gap-[30px]'>
            <img
              className='max-w-[300px] rounded-[10px]'
              src="/profile_1.jpg"
              alt="profile_1"
            />

            <div className='flex justify-center w-full gap-[30px]'>
              {
                buttonList.map((item, index) => {
                  return(
                    <button 
                      className="p-[10px] rounded-[10px] bg-[var(--foreground-rgb)] duration-200 hover:opacity-70"
                      onClick={() => item.onClick()}
                      key={index}
                    >
                      {item.svg}
                    </button>
                  )
                })
              }
            </div>
          </div>

          <div data-aos="fade-left" className='flex flex-col w-full gap-[25px]'>
              <p className='text-[32px] font-medium'>"안녕하세요? 저는 서호준입니다."</p>
              <p className='font-light leading-[35px]'>
                저는 명지대학교 컴퓨터 공학과에 재학중인 서호준이라고 합니다.<br/>
                현재는 웹(프론트 / 백)을 활용하여 다양한 소프트웨어와 서비스를 개발하고 있습니다.<br/>
                저는 호기심이 많고, 알아갈 수 있는 것이 있으면 뭐든지 재미있고, 흥미있게 관심을 가집니다.<br/>
                언젠가 혁신적인 아이디어로 세상을 바꿀 수 있는 무언가를 만드는 것이 꿈입니다.
              </p>
              <MainButton 
                text={"About me"} 
                onClick={() => {
                  router.push("about")
                }}
                style='opacity-30 hover:opacity-100'
              />
          </div>
        </div>
    </div>
  )
}

export default AboutSection