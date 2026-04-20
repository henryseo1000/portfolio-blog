'use client';

import Introduction from "@/components/about/Introduction";
import Motto from "@/components/about/Motto";
import { useEffect, useState } from "react";

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

        <Introduction/>
        <Motto/>


      </div>
    </div>
  )
}