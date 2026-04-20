"use client";

import LogoDark from '../../../public/logo_dark.svg';
import Sun from '../../../public/svg/sun.svg';

import ProgressBar from "../posts/ProgressBar";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { postCategoryList } from '@/data/postCategory';
import { useRouter } from 'next/navigation';
import { NavProps } from '@/types/navTypes';
import { Info, X } from 'lucide-react';
import { releaseScroll, scrollLock } from '@/utils/scrollLock';

function MainNav({ menuList } : { menuList : NavProps[]}) {
    const [focusedMenu, setFocusedMenu] = useState<number>(0); 
    const [scrollPos, setScrollPos] = useState<number>(0);
    const [change, setChange] = useState<boolean>(false);
    const [isTriggered, setTriggered] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDialogElement>(null);

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

                <button 
                    className={cn("flex items-center justify-center px-[12px] py-[8px] gap-[5px] text-[var(--background-plain)] rounded-[10px] bg-[var(--foreground-rgb)] duration-300 hover:opacity-70", change && "text-[var(--foreground-rgb)] bg-[var(--background-plain)]")}
                    onClick={() => {
                        if (infoRef.current) {
                            if (open) {
                                infoRef.current.close();
                                releaseScroll();
                            }
                            else {
                                infoRef.current.showModal();
                                scrollLock();
                            }
                        }
                    }}
                >
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

            <dialog className='relative w-[70%] px-[35px] py-[30px] rounded-[15px]' ref={infoRef} open={open}>
                <div className='flex flex-col w-full max-h-[320px] gap-[35px] overflow-y-scroll'>
                    <div>
                        <p className='text-[var(--background-plain)] text-[20px] font-bold'>웹페이지 소개</p>
                        <p className='text-[var(--background-plain)] text-[15px]'>
                            안녕하세요! 제 포트폴리오 페이지에 오신 것을 환영합니다!<br/>여기는 제가 만들고 싶었던 컨셉 몇 개를 모아 만든 곳입니다.<br/>다양한 시도를 해보고 싶어서, 일부러 UI가 페이지(루트)마다 일관적이지 않도록 만들었습니다.
                        </p>
                    </div>

                    <div>
                        <p className='text-[var(--background-plain)] text-[20px] font-bold'>메인 페이지(/)</p>
                        <p className='text-[var(--background-plain)] text-[15px]'>
                            먼저 IntroSection은 three.js를 간단하게 사용하였고, EventListener를 통해 우주 속 각기 다른 점들이 움직이는 것을 표현했습니다.<br/>
                            내리면 섹션에 따라 저에 대한 간단한 정보들을 얻을 수 있게 구상하였습니다.
                        </p>
                    </div>

                    <div>
                        <p className='text-[var(--background-plain)] text-[20px] font-bold'>About 페이지(/about)</p>
                        <p className='text-[var(--background-plain)] text-[15px]'>
                            명함과 Tinder의 Swipe UI에 영감을 받아 만들었습니다.<br/>다른 사람에게 소개할 때 회사원들이 명함을 보여주는 모습이 멋지다고 생각했는데, 아직 명함을 가지지 못해서 저를 소개하는 페이지 속에 구현해보고 싶었습니다.
                        </p>
                    </div>

                    <div>
                        <p className='text-[var(--background-plain)] text-[20px] font-bold'>Projects 페이지(/projects)</p>
                        <p className='text-[var(--background-plain)] text-[15px]'>
                            노션의 프로젝트 과정을 저장해 놓은 페이지들을 불러와 간단한 Overview 그래프를 띄워줍니다.<br/>여기는 제가 만들고 싶었던 컨셉 몇 개를 모아 만든 곳입니다.
                        </p>
                    </div>

                    <div>
                        <p className='text-[var(--background-plain)] text-[20px] font-bold'>Posts 페이지(/posts)</p>
                        <p className='text-[var(--background-plain)] text-[15px]'>
                            노션의 데이터베이스에서 정리해놓은 글들을 가져와 Post 페이지에 띄워줍니다.<br/>제가 평소에 보던 블로그와 같은 모습을 최대한 구현하고 싶어서 UI 요소들을 둥글둥글하게 디자인하였고, 댓글은 Utterances를 사용했습니다.
                        </p>
                    </div>
                </div>
                <X 
                    className='absolute top-[20px] right-[20px] cursor-pointer'
                    onClick={() => {
                        infoRef.current.close();
                        releaseScroll();
                    }}
                />
            </dialog>
        </div>
    )
}

export default MainNav;