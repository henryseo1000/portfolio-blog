import careers from "@/data/career";
import CareerProps from "@/types/careerTypes";
import { useState } from "react";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import CareeerCards from "./section_components/CareeerCards";

function CareerSection({ref}) {

  const skillPages = () => {
    const arr = [];
    let leftCards = careers.length;
    let index = 0;

    while (leftCards > 0) {
      let buf = 0;

      if (leftCards >= 4) {
        buf = 4;
        leftCards -= 4
      }
      else {
        buf = leftCards;
        leftCards = 0;
      }

      arr.push(
        <div className={`grid grid-cols-2 gap-[30px]`}>
          {
            careers.slice(index, index + buf).map((item, key) => {
              return <CareeerCards key={index + key} {...item}/>
            })
          }
        </div>
      )

      index += 6;
    }

    return arr;
  }

  return (
    <div ref={ref} className='flex items-center justify-center w-screen h-screen px-[100px] py-[50px] gap-[100px] bg-[var(--background-basic)]'>
      <div
        data-aos="fade-right"
        className='flex w-full'
      >
        <Swiper
          style={{
            
          }}
          slidesPerView={1}
          pagination ={{clickable: true}}
          autoplay={{
            disableOnInteraction: false,
          }}
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
    </div>
  )
}

export default CareerSection;