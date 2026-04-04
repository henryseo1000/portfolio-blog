import React, { MutableRefObject, useEffect, useState } from 'react'
import SkillSelect from './section_components/SkillSelect';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SkillCards from './section_components/SkillCards';
import skills from '@/data/skills';



function SkillSection({ref} : {ref: MutableRefObject<HTMLDivElement>}) {
  const [category, setCategory] = useState<string>("all");

  const skillPages = (col = 3, row = 2) => {
    const arr = [];
    const amountInPage = col * row;
    let leftCards = skills.length;
    let index = 0;

    while (leftCards > 0) {
      let buf = 0;

      if (leftCards >= amountInPage) {
        buf = amountInPage;
        leftCards -= amountInPage
      }
      else {
        buf = leftCards;
        leftCards = 0;
      }

      arr.push(
        <div className={`grid grid-cols-${col} gap-[20px]`}>
          {
            skills.slice(index, index + buf).map((item, key) => {
              return <SkillCards key={index + key} {...item}/>
            })
          }
        </div>
      )
    }

    return arr;
  }

  useEffect(() => {

  }, [])

  return (
    <div ref={ref} className='flex items-center justify-center w-screen h-screen px-[100px] py-[50px] gap-[100px] bg-[var(--background-basic)]'>
      <div
        data-aos="fade-right"
        className='flex w-[80%]'
      >
        <Swiper
          className='max-w-fit'
          slidesPerView={1}
          autoplay={{delay: 1000}}
          pagination
        >
          {skillPages().map((item, index) => {
            return (
              <SwiperSlide 
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }} 
                key={index}
              >
                {item}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      <div 
        data-aos="fade-left"
        className='flex w-full'
      >
        <div>
          <p>My</p>
          <p>Skills</p>
        </div>

        <SkillSelect/>
      </div>
    </div>
  )
}

export default SkillSection