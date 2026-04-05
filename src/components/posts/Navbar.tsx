'use client'

import profileData from "@/data/profile";
import GithubLogo from "../../../public/svg/github-smaller.svg";
import { usePathname, useRouter } from "next/navigation";
import { postCategoryList } from "@/data/postCategory";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn } from "@/utils/cn";

export default function Navbar ({ 
        isMinimized, 
        setIsMinimized 
    } : 
    { isMinimized? : boolean, 
        setIsMinimized: Dispatch<SetStateAction<boolean>> 
}) {
    
    const router = useRouter();
    const [focused, setFocused] = useState<number>();
    const location = usePathname();

    const setInitialFocus = () => {
        postCategoryList.map((item, index) => {
            if (location.includes(item.path)) {
                setFocused(index);
                return;
            }
        })
    }

    useEffect(() => {
        setInitialFocus();
    }, [location])

    return (
        <nav className={cn("flex flex-col fixed left-[15px] w-[250px] h-[calc(100%-30px)] gap-[5px] rounded-[20px] border-[#4C4C4C] border-[1px] bg-[#393939] duration-500 overflow-hidden", isMinimized && "w-[180px]")}>
            <div className="flex flex-col items-center justify-center px-[30px] pt-[40px] pb-[20px] gap-[10px] border-b-[1px] border-solid border-b-[var(--border-light-dark)]">
                <img 
                    className="w-[50%] aspect-square border-[1px] border-solid border-[var(--border-light-dark)] rounded-[50%] object-cover object-top"
                    src={profileData.imagePath} 
                    alt="profile_1.jpg" 
                    draggable={false}
                />
                <div className="flex flex-col items-center gap-[3px]">
                    <p className="text-[15px] font-bold">{profileData.name}</p>
                    <p className="text-[12px] font-light">{profileData.job}</p>
                </div>
                <p className="text-[var(--border-light)] text-[12px] font-light text-ellipsis line-clamp-2 overflow-hidden">
                    {profileData.description}
                </p>
                <button 
                    className="flex items-center justify-center w-full px-[15px] py-[10px] gap-[10px] text-[var(--foreground-rgb)] rounded-[5px] bg-[var(--background-basic)]"
                    onClick={() => {
                        window.open(profileData.githubLink, "_self")
                    }}
                >
                    <GithubLogo className="w-[15px] h-[15px] fill-[var(--foreground-rgb)]"/>
                    <p className="text-[12px] font-bold">Github Page</p>
                </button>
            </div>

            <div className="flex flex-col max-h-[372px] pb-[5px] border-b-[1px] border-solid border-b-[var(--border-light-dark)] overflow-y-scroll">
                {
                    postCategoryList.map((item, index) => {
                        return (
                            <div 
                                key={index}
                                className={cn("flex items-center px-[25px] py-[20px] gap-[15px] duration-300 cursor-pointer select-none hover:bg-[var(--border-light-dark)]", focused === index && "bg-[var(--border-light-dark)]")}
                                onClick={() => {
                                    setFocused(index)
                                    router.replace(`/posts/${item.path}`);
                                }}
                            >
                                {item.icon}
                                <p className="text-[14px] font-light">{item.title}</p>
                            </div>
                        )
                    })
                }
            </div>

            <div className="flex flex-col relative items-center justify-center bottom-0 pt-[35px] gap-[20px]">
                <button
                    className="px-[15px] py-[10px] rounded-[20px] bg-[var(--border-light-dark)]"
                    onClick={() => {
                        router.replace('/');
                    }}
                >
                    <p className="text-[12px]">Back to main</p>
                </button>
                <div 
                    className="relative w-[80px] h-[4px] rounded-[2px] bg-[var(--border-light)] duration-1000 cursor-pointer hover:scale-[1.1]"
                    onClick={() => {
                        setIsMinimized(!isMinimized)
                    }}
                />
            </div>
        </nav>
    )
}