import React, { MutableRefObject, useEffect, useState } from 'react';
import SkillSelect from './section_components/SkillSelect';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SkillCards from './section_components/SkillCards';
import skills from '@/data/skills';
import categoryList from '@/data/category';
import { SkillTypes } from '@/types/skillTypes';



function SkillSection({ref} : {ref: MutableRefObject<HTMLDivElement>}) {
  const [category, setCategory] = useState<string>("all");
  const [list, setFilteredList] = useState<SkillTypes[]>(skills);
  SwiperCore.use([Autoplay]);

  const skillPages = () => {
    const arr = [];
    let leftCards = list.length;
    let index = 0;

    while (leftCards > 0) {
      let buf = 0;

      if (leftCards >= 6) {
        buf = 6;
        leftCards -= 6
      }
      else {
        buf = leftCards;
        leftCards = 0;
      }

      arr.push(
        <div className={`grid grid-cols-3 gap-[20px]`}>
          {
            list.slice(index, index + buf).map((item, key) => {
              return <SkillCards key={index + key} {...item}/>
            })
          }
        </div>
      )

      index += 6;
    }

    return arr;
  }

  const filterSkills = () => {
    const arr = [];

    if (category === "all") {
      return setFilteredList(skills);
    }

    skills.map((item) => {
      item.category.map(
        (itemCategory) => {
          if (itemCategory === category) {
            arr.push(item);
            return;
          }
        }
      )
    })

    setFilteredList(arr);
  }

  useEffect(() => {
    filterSkills();
  }, [category])

  return (
    <div ref={ref} className='flex items-center justify-center w-screen h-screen px-[100px] py-[50px] gap-[100px] bg-[var(--background-basic)]'>
      <div
        data-aos="fade-right"
        className='flex w-[70%]'
      >
        <Swiper
          slidesPerView={1}
          pagination ={{clickable: true}}
          autoplay={true}
          speed={1500}
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
        className='flex flex-col w-[20%] gap-[20px]'
      >
        <div className='flex gap-[15px] select-none'>
          <p className='text-[48px] font-extrabold'>My</p>
          <p className='text-[48px] font-extrabold [-webkit-text-stroke:1px_var(--foreground-rgb)]'>Skills</p>
        </div>

        <SkillSelect 
          value={category} 
          setValue={setCategory} 
          optionList={categoryList}
        />
      </div>
    </div>
  )
}

export default SkillSection