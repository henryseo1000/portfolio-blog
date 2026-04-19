'use client';

import copyToClipBoard from "@/utils/copyToClipboard";
import handleDownload from "@/utils/download";
import { CopyIcon, InfoIcon } from "lucide-react";
import { MutableRefObject, useEffect, useRef, useState } from "react";

export default function About() {
  const [data, setData] = useState<string[]>(["card0", "card1", "card2", "card3", "card4"]);
  const [startX, setStartX] = useState<number>();
  const [startY, setStartY] = useState<number>();
  const [offsetX, setOffsetX] = useState<number>();
  const [offsetY, setOffsetY] = useState<number>();
  const [focusedIdx, setFocusedIdx] = useState<number>(data.length - 1);
  const [stack, setStack] = useState(data);

  const handleMouseDown = (e : MouseEvent) => {
    const {clientX, clientY} = e;
    setStartX(clientX);
    setStartY(clientY);
  }

  const handleMouseMove = (e : MouseEvent) => {
    const focusedElement = document.getElementsByClassName(data[focusedIdx]);
    const {clientX, clientY} = e;
    setOffsetX(clientX - startX)
    setOffsetY(clientY - startY)

    if (focusedElement[0]) {
      if (offsetX !== null && offsetY !== null) {
        (focusedElement[0] as HTMLElement).style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${(data.length - 1) * 2 + offsetX * 0.1}deg)`;
      }
    }
  }

  const handleMouseUp = (e : MouseEvent) => {
    const focusedElement = document.getElementsByClassName(data[focusedIdx]);

    if(focusedElement[0]) {
      if (offsetX > 350) {
        (focusedElement[0] as HTMLElement).style.transform = `translate(250%, 0%) rotate(90deg)`;
        setTimeout(() => {
          const poped = stack.pop()
          setFocusedIdx((prev) => {
            if (prev === 0) {
              return data.length - 1
            }
            return prev - 1
          })
        }, 200)
      }
      else if (offsetX < -350) {
        (focusedElement[0] as HTMLElement).style.transform = `translate(-250%, 0%) rotate(-90deg)`;
        setTimeout(() => {
          const poped = stack.pop()
          setFocusedIdx((prev) => {
            if (prev === 0) {
              return data.length - 1
            }
            return prev - 1
          })
        }, 200)
      }
      else {
        (focusedElement[0] as HTMLElement).style.transform = `translate(-50%, -50%) rotate(${(data.length - 1) * 2}deg)`
      }
    }
    
    setStartX(undefined);
    setStartY(undefined);
    setOffsetX(undefined);
    setOffsetY(undefined);
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("dragstart", e => e.preventDefault());

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [data, focusedIdx, startX, startY, offsetX, offsetY]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="flex absolute w-full top-[50%] left-[50%] items-center justify-center translate-x-[-50%] translate-y-[-50%]">
        {stack.map((item, index) => {

          return (
              <div 
                className={`${item} flex flex-col justify-center absolute top-[50%] left-[50%] w-[50%] aspect-[7/4] p-[50px] gap-[30px] border-[1px] rounded-[10px] bg-[var(--foreground-rgb)] duration-200 shadow-lg translate-x-[-50%] translate-y-[-50%] rotate-[1deg] select-none`}
                key={index}
              >
                <div className="flex items-center gap-[10px] text-[var(--background-basic)] text-[25px] font-bold">
                  <InfoIcon/>
                  <p>INTRODUCTION</p>
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col">
                    <p className="text-[var(--background-basic)] text-[20px]">서호준 HOJUN SEO</p>
                    <p className="text-[var(--background-basic)] text-[15px] font-thin">Software Engineer</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-[5px] text-[var(--background-basic)] text-[15px]">
                      <p>E-mail1 : henryseo1000@gmail.com</p>
                      <CopyIcon 
                        className="opacity-50 cursor-pointer" 
                        height={15}
                        onClick={() => {
                          copyToClipBoard("henryseo1000@gmail.com")
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-center gap-[5px] text-[var(--background-basic)] text-[15px]">
                      <p>E-mail2 : henryseo1000@naver.com</p>
                      <CopyIcon 
                        className="opacity-50 cursor-pointer" 
                        height={15}
                        onClick={() => {
                          copyToClipBoard("henryseo1000@naver.com")
                        }}
                      />
                    </div>

                    <button
                      className="bg-[var(--background-basic)]"
                      onClick={() => {
                        handleDownload("/files/정보처리산업기사_자격증.pdf", "서호준_자격증.pdf")
                      }}
                    >
                      자격증 테스트
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}