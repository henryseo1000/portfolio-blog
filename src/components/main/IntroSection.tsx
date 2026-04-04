"use client";

import { Canvas } from '@react-three/fiber';
import {
  PerspectiveCamera,
} from "@react-three/drei";
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import ScrollDownArrow from "../../../public/svg/scrollDown.svg";

import Dots from './Dots';

function IntroSection({ref} : {ref: MutableRefObject<HTMLDivElement>}) {
  const [jobs, setjobs] = useState<string[]>(['a Designer', 'an Artist', 'FE Engineer', "BE Engineer", 'a Designer']);
  const jobsref = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>("");
  const [changedText, setChangedText] = useState<boolean>(false);

  const generateKeyframes = () => {
    const keyArr = [];
    let duration = 0;

    if (input.trim() !== "") {
      jobs.splice(jobs.length - 1, 1, input);
      jobs.push(jobs[0]);
    }

    if (jobsref.current) {
      const offsetDiff = 1.0 / jobs.length;
      let currentOffset = 0;

      jobs.map((item, index) => {
        if (index !== 0) {
          for (let i = 0; i < 3; i++) {
            if (i == 0) {
              currentOffset += offsetDiff * 0.4;
              keyArr.push({ transform: `translateY(-${index * 100 + 5}%)`, offset: currentOffset})
            }
            else if (i == 1) {
              currentOffset += offsetDiff * 0.2;
              keyArr.push({ transform: `translateY(-${index * 100 - 5}%)`, offset: currentOffset})
            }
            else {
              currentOffset += offsetDiff * 0.4;
              if (index === jobs.length - 1) {
                keyArr.push({ transform: `translateY(-${index * 100}%)`, offset: 1})
              }
              else {
                keyArr.push({ transform: `translateY(-${index * 100}%)`, offset: currentOffset})
              }
            }
          }
        }
        else {
          keyArr.push({ transform: `translateY(-${index * 100}%)`, offset: currentOffset})
        }

        duration += 1500;
      })

      jobsref.current.animate(
        keyArr,
        {
          duration: duration,
          iterations: Infinity
        }
      )
    }

    setChangedText(!changedText);
    setInput("");
  }
  
  useEffect(() => {
    if (jobsref.current) {
      generateKeyframes();
     }
  }, [jobs]);

  return (
    <div ref={ref} className='w-screen h-screen bg-[var(--background-plain)]'>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <Dots/>
          <PerspectiveCamera position={[100, 100, 10]} />
        </Canvas>

        <div className='flex flex-col absolute items-center justify-center left-[50%] top-[50%] w-full gap-[30px] translate-x-[-50%] translate-y-[-50%] z-10'>
          <div className='flex h-[110px] gap-[15px] text-[60px] font-extrabold overflow-hidden select-none'>
              <p>
                I can be
              </p>
              <div ref={jobsref} className='relative'>
                {
                  jobs.map((item, index) => {
                    return (
                      <span className='block max-w-[400px] h-full text-[rgba(0,0,0,0)] overflow-hidden text-ellipsis [-webkit-text-stroke:1px_var(--foreground-rgb)]' key={index}>{item}</span>
                    )
                  })
                }
              </div>
          </div>

          <div className='flex items-center justify-center w-full gap-[10px]'>
            <input 
              className="w-[100%] max-w-[584px] h-[40px] p-[20px] text-[14px] text-[#ADADAD] rounded-[20px] outline-none" 
              type="text"
              placeholder='What do you want to be?'
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
            />
            <button
              className='flex items-center justify-center w-[70px] h-[40px] p-[15px] text-[14px] border-[1px] border-solid border-[var(--foreground-rgb)] rounded-[20px] bg-[var(--background-basic)] hover:bg-[var(--background-basic-light)]'
              onClick={() => {
                if (input.trim() === "") {
                  alert("공백 없이 한 글자 이상 입력해주세요!");
                }
                else {
                  generateKeyframes();
                }
              }}  
            >
              Add
            </button>
          </div>
        </div>

        <div className='flex flex-col absolute items-center left-[50%] bottom-[40px] gap-[10px] text-[var(--border-light-dark)] select-none transform-[translateX(-50%)] animate-[scrollDown_2s_infinite]'>
            <p className='text-[12px] font-extralight'>Scroll</p>
            <ScrollDownArrow />
        </div>
    </div>
  )
}

export default IntroSection