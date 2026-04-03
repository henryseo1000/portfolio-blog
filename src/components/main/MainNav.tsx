"use client";

import LogoDark from '../../../public/logo_dark.svg';
import LogoLight from '../../../public/logo_light.svg';
import Sun from '../../../public/svg/sun.svg';

import ProgressBar from "../posts/ProgressBar";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";


function MainNav({ menuList } : any) {
    const [focusedMenu, setFocusedMenu] = useState<number>(0); 
    const [scrollPos, setScrollPos] = useState<number>(0);
    const [change, setChange] = useState<boolean>(false);

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

        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollPos])

    return (
        <div className={cn('fixed top-0 w-full px-[50px] py-[20px] border-b-[rgba(0,0,0,0)] z-20 duration-1000', change && "bg-[var(--foreground-rgb)] border-b-[0.5px] border-b-[var(--border-light)]")}>
            <ProgressBar position="bottom"/>
            <div className="flex items-center justify-between">
                <LogoDark/>

                <div className="flex px-[15px] py-[5px] gap-[40px]">
                    {menuList.map((item, index) => {
                        return (
                        <div 
                            className={cn("flex min-w-[70px] h-[30px] rounded-[10px] items-center justify-center select-none cursor-pointer duration-200", 
                                focusedMenu === index && (change ? " text-[var(--foreground-rgb)] bg-[var(--background-plain)]" : " bg-[var(--foreground-rgb)] text-[var(--background-plain)]"))}
                            key={index}
                            onClick={() => {
                                setFocusedMenu(index);
                                item.ref.current.scrollIntoView({ behavior: 'smooth', block: 'start'});
                            }}
                        >
                            <span className={cn("text-[16px] font-normal", focusedMenu !== index && change && "text-[var(--background-plain)]")}>{item.title}</span>
                        </div>
                    )
                    })}
                </div>

                <button className="flex items-center justify-center w-[30px] h-[30px] border-[0.5px] border-solid border-[var(--background-plain)] rounded-[5px] bg-[var(--foreground-rgb)]">
                    <Sun />
                </button>
            </div>
        </div>
    )
}

export default MainNav;