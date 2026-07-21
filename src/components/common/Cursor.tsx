import { useEffect, useRef, useState } from 'react'

function Cursor() {
    const smallDivRef = useRef<HTMLDivElement>(null);
    const bigDivRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e : MouseEvent) => {
        if (smallDivRef.current && smallDivRef) {
            smallDivRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
        }

        if (bigDivRef.current && bigDivRef) {
            bigDivRef.current.style.transform = `translate(${e.clientX - 25}px, ${e.clientY - 25}px)`;
        }
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove, false);

        return () => window.removeEventListener("mousemove", handleMouseMove, false);
    }, [])
    

    return (
        <>
            <div className='fixed w-[10px] h-[10px] rounded-[50%] bg-[#d8d8d8] pointer-events-none z-[999]' ref={smallDivRef}>
            
            </div>
            <div className='fixed w-[50px] h-[50px] border-[0.5px] rounded-[50%] bg-[#d8d8d833] duration-[50ms] pointer-events-none z-[999]' ref={bigDivRef}>
        
            </div>
        </>
    )
}

export default Cursor