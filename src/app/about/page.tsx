'use client';

import Experience from "@/components/about/Experience";
import Interests from "@/components/about/Interests";
import Introduction from "@/components/about/Introduction";
import Motto from "@/components/about/Motto";
import Skills from "@/components/about/Skills";
import { Home, RotateCcw, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function About() {
  const data = ["card4", "card3", "card2", "card1", "card0"];
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

    setOffsetX(clientX - startX);
    setOffsetY(clientY - startY);

    if (focusedElement[0]) {
      if (offsetX !== null && offsetY !== null) {
        (focusedElement[0] as HTMLElement).style.transform = `translate(calc(-50% + ${offsetX}px), -50%) rotate(${(data.length - 1) * 2 + offsetX * 0.1}deg)`;
      }
    }
  }

  const handleMouseUp = (e : MouseEvent) => {
    const focusedElement = document.getElementsByClassName(data[focusedIdx]);

    if(focusedElement[0]) {
      if (offsetX > 300) {
        (focusedElement[0] as HTMLElement).style.transform = `translate(250%, 0%) rotate(90deg)`;

        setFocusedIdx((prev) => {
            if (prev === 0) {
              return data.length - 1;
            }
            return prev - 1;
        });

        setStack((prev) => {
          return stack.slice(0, prev.length - 1);
        });

        // setTimeout(() => {
        //   (focusedElement[0] as HTMLElement).style.display = 'none';
        // }, 100);
      }
      else if (offsetX < -300) {
        (focusedElement[0] as HTMLElement).style.transform = `translate(-250%, 0%) rotate(-90deg)`;

        setFocusedIdx((prev) => {
          if (prev === 0) {
            return data.length - 1;
          }
          return prev - 1;
        });

        setStack((prev) => {
          return stack.slice(0, prev.length - 1);
        });

        // setTimeout(() => {
        //   (focusedElement[0] as HTMLElement).style.display = 'none';
        // }, 100);
        
      }
      else {
        (focusedElement[0] as HTMLElement).style.transform = `translate(-50%, -50%) rotate(${(focusedIdx) * 2}deg)`;
      }
    }
    
    setStartX(undefined);
    setStartY(undefined);
    setOffsetX(undefined);
    setOffsetY(undefined);
  }

  const reset = () => {
    data.forEach((className, index) => {
      const focusedElement = document.getElementsByClassName(className);
      (focusedElement[0] as HTMLElement).style.display = 'flex';
      (focusedElement[0] as HTMLElement).style.transform = `translate(-50%, -50%) rotate(${(index) * 2}deg)`;
    })

    setStack([...data]);
    setFocusedIdx(data.length - 1);
  }

  const cancel = () => {
    if (focusedIdx != data.length - 1) {
      const focusedElement = document.getElementsByClassName(data[focusedIdx + 1]);
      (focusedElement[0] as HTMLElement).style.transform = `translate(-50%, -50%) rotate(${(focusedIdx + 1) * 2}deg)`;

      setStack([...stack, data[focusedIdx + 1]]);
      setFocusedIdx(focusedIdx + 1);
    }
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
  }, [stack, focusedIdx, startX, startY, offsetX, offsetY]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <p className="absolute text-[20rem] opacity-40 select-none text-top">
        SWIPE
      </p>

      <p className="absolute right-0 bottom-0 text-[20rem] select-none">
        ME
      </p>

      <div className="flex absolute w-full top-[50%] left-[50%] items-center justify-center translate-x-[-50%] translate-y-[-50%]">
        <Interests/>
        <Skills/>
        <Experience/>
        <Motto/>
        <Introduction/>
      </div>

      <div className="flex fixed justify-between left-[50%] bottom-[10%] w-[250px] translate-x-[-50%]">
        <button onClick={cancel} className="flex items-center justify-center p-[5px] rounded-lg border-[#ffffff] border-[1px] duration-[0.5s] cursor-pointer hover:opacity-50">
          <Undo2 size={25}/>
        </button>

        <button onClick={() => {navigation.navigate('/')}} className="flex items-center justify-center p-[5px] rounded-lg border-[#ffffff] border-[1px] duration-[0.5s] cursor-pointer hover:opacity-50">
          <Home size={25}/>
        </button>

        <button onClick={reset} className="flex items-center justify-center p-[5px] rounded-lg border-[#ffffff] border-[1px] duration-[0.5s] cursor-pointer hover:opacity-50">
          <RotateCcw size={25}/>
        </button>
      </div>
    </div>
  )
}