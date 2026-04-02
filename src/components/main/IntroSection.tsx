"use client";

import { Canvas } from '@react-three/fiber';
import {
  PerspectiveCamera,
} from "@react-three/drei";
import { MutableRefObject, useEffect } from 'react';

import Dots from './Dots';
import { useRouter } from 'next/navigation';

function IntroSection({ref} : {ref: MutableRefObject<HTMLDivElement>}) {
  

  return (
    <div className='w-screen h-screen bg-[var(--background-plain)]'>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <Dots/>
          <PerspectiveCamera position={[100, 100, 10]} />
        </Canvas>

        <div className='flex flex-col absolute items-center justify-center left-[50%] top-[50%] w-full gap-[30px] translate-x-[-50%] translate-y-[-50%] z-10'>
          <div>
            <span className='flex gap-[10px] text-[60px] font-extrabold select-none'>
              I can be a 
              <span className='text-[rgba(0,0,0,0)] [-webkit-text-stroke:1px_var(--foreground-rgb)]'>Designer</span>
            </span>
          </div>

          <div className='flex items-center justify-center w-full gap-[10px]'>
            <input 
              className="w-[100%] max-w-[584px] h-[40px] p-[20px] text-[14px] text-[#ADADAD] rounded-[20px] outline-none" 
              type="text"
              placeholder='What do you want to be?'
            />
            <button
              className='flex items-center justify-center w-[70px] h-[40px] p-[15px] text-[14px] border-[1px] border-solid border-[var(--foreground-rgb)] rounded-[20px] bg-[var(--background-basic)]'
            >
              Add
            </button>
          </div>
        </div>
    </div>
  )
}

export default IntroSection