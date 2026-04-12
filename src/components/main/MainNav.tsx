"use client";

import LogoDark from '../../../public/logo_dark.svg';
import Sun from '../../../public/svg/sun.svg';

import ProgressBar from "../posts/ProgressBar";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { postCategoryList } from '@/data/postCategory';
import { useRouter } from 'next/navigation';
import { NavProps } from '@/types/navTypes';
import { Info, InfoIcon, SquareArrowOutUpRight } from 'lucide-react';

function MainNav({ menuList } : { menuList : NavProps[]}) {
    const [focusedMenu, setFocusedMenu] = useState<number>(0); 
    const [scrollPos, setScrollPos] = useState<number>(0);
    const [change, setChange] = useState<boolean>(false);
    const [isTriggered, setTriggered] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const router = useRouter();

    const handleScroll = () => {
        setScrollPos(window.scrollY);

        if (scrollPos >= 100) {
            setChange(true);
        }
        else {
            setChange(false);
        }
    }

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [scrollPos])

    return (
        <div className={cn('flex flex-col fixed top-0 w-full pt-[20px] border-b-[rgba(0,0,0,0)] z-20 duration-1000', change && "bg-[var(--foreground-rgb)] border-b-[0.5px] border-b-[var(--border-light)]")}>
            <ProgressBar position="bottom"/>
            <div className={cn("flex items-center justify-between px-[40px] pb-[20px]", change && "border-b-[0.5px] border-b-[var(--border-light)]")}>
                <LogoDark/>

                <div className="flex px-[15px] py-[5px] gap-[40px]">
                    {menuList.map((item, index) => {
                        if (item?.isVisible === false) {
                            return <div key={index} className='hidden'/>
                        }
                        else {
                            return (
                                <div 
                                    className={cn("flex min-w-[70px] h-[30px] rounded-[10px] items-center justify-center select-none cursor-pointer duration-200", 
                                        focusedMenu === index && (change ? " text-[var(--foreground-rgb)] bg-[var(--background-plain)]" : " bg-[var(--foreground-rgb)] text-[var(--background-plain)]"), 
                                        item.title
                                    )}
                                    key={index}
                                    onClick={() => {
                                        setFocusedMenu(index);
                                        item.ref.current.scrollIntoView({ behavior: 'smooth', block: 'start'});
                                    }}
                                    onMouseOver={() => {
                                        if (item.title === "Posts") {
                                            setChange(true);
                                            setTriggered(true);
                                        }
                                        else {
                                            handleScroll()
                                            setTriggered(false);
                                        }
                                    }}
                                >
                                    <span className={cn("text-[16px] font-normal cursor-pointer", focusedMenu !== index && change && "text-[var(--background-plain)] cursor-pointer")}>{item.title}</span>
                                </div>
                            )
                        }
                    })}
                </div>

                <button className={cn("flex items-center justify-center px-[12px] py-[8px] gap-[5px] text-[var(--background-plain)] rounded-[10px] bg-[var(--foreground-rgb)] duration-300 hover:opacity-70", change && "text-[var(--foreground-rgb)] bg-[var(--background-plain)]")}>
                    <p className='text-[15px]'>Page Info</p>
                    <Info height={17}/>
                </button>
            </div>

            <div 
                className={cn('w-full h-0 box-border duration-300 overflow-hidden', isTriggered && "h-[150px]")}
                ref={ref}
                onMouseLeave={(e)=>{
                    if (isTriggered) {
                        handleScroll()
                        setTriggered(false)
                    }
                }}
            >
                <div
                    className={cn("grid grid-cols-3 min-h-[150px] items-center justify-center py-[15px]")}
                >
                {postCategoryList.map((item, index) => {
                    return (
                        <p
                            className={cn("flex items-center justify-center gap-[5px] text-[var(--foreground-rgb)] cursor-pointer", change && "text-[var(--border-light-dark)]")}
                            key={index}
                            onClick={() => {
                                router.push(`/posts/${item.path}`)
                            }}
                        >
                            {item.icon}
                            {item.title}
                        </p>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default MainNav;