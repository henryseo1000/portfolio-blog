import { useEffect, useRef, useState } from 'react'

function Cursor() {
    const smallDivRef = useRef<HTMLDivElement>(null);
    const bigDivRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e : MouseEvent) => {
        if (smallDivRef.current && smallDivRef) {
            smallDivRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
        }

        if (bigDivRef.current && bigDivRef) {
            bigDivRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
        }
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove, false);

        return () => window.removeEventListener("mousemove", handleMouseMove, false);
    }, [])
    

    return (
        <>
            <div className='fixed w-[10px] h-[10px] rounded-[50%] bg-[#ffffff] pointer-events-none z-[999]' ref={smallDivRef}>
            
            </div>
            <div className='fixed w-[40px] h-[40px] rounded-[50%] bg-[#ffffff] opacity-[30%] duration-100 pointer-events-none z-[999]' ref={bigDivRef}>
        
            </div>
        </>
    )
}

export default Cursor