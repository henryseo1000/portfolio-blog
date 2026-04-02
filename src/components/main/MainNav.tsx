"use client";

import LogoDark from '../../../public/logo_dark.svg';
import Sun from '../../../public/svg/sun.svg';

import ProgressBar from "../posts/ProgressBar";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

interface MenuType {
    title : string;
    scroll? : number;
}


function MainNav() {
    const [focusedMenu, setFocusedMenu] = useState<number>(0); 

    const menuList : MenuType[] = [
        {
            title: "Intro"
        },
        {
            title: "About"
        },
        {
            title: "Skills"
        },
        {
            title: "Projects"
        },
        {
            title: "Posts"
        },
    ]

    useEffect(() => {

    }, [focusedMenu])

    return (
        <div className='fixed top-0 w-full px-[50px] py-[20px] z-10'>
            <ProgressBar position="bottom"/>
            <div className="flex justify-between">
                <LogoDark/>

                <div className="flex px-[15px] py-[5px] gap-[40px]">
                    {menuList.map((item, index) => {
                        return (
                        <div 
                            className={cn("flex w-[65px] h-[30px] rounded-[10px] items-center justify-center select-none cursor-pointer duration-200", focusedMenu === index && "bg-[var(--foreground-rgb)] text-[var(--background-plain)]")}
                            key={index}
                            onClick={() => {
                                setFocusedMenu(index);
                            }}
                        >
                            <span className="text-[16px] font-normal">{item.title}</span>
                        </div>
                    )
                    })}
                </div>

                <button className="w-[30px] h-[30px] p-[5px] rounded-[5px] bg-[var(--foreground-rgb)]">
                    <Sun />
                </button>
            </div>
        </div>
    )
}

export default MainNav;