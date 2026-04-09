'use client';

import { PageNavProps } from "@/types/navTypes";
import { cn } from "@/utils/cn";
import { Command, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function PageNav({ menuList } : { menuList : PageNavProps[] }) {
    const location = usePathname();
    const router = useRouter();

    useEffect(() => {

    }, [location]);

    return (
        <div className='flex fixed items-center justify-between top-0 w-full h-[75px] px-[30px] border-b-[0.5px] border-b-[var(--border-light-dark)] bg-[var(--background-basic)] z-10'>
            <div className="flex items-center gap-[5px]">
                {
                    menuList.map((item, index) => {
                        if (index === menuList.length - 1) {
                            return (
                                <p 
                                    className="text-[12px] cursor-pointer duration-200 hover:underline" 
                                    onClick={() => {
                                        router.push(item.path);
                                    }}
                                    key={index}
                                >
                                    {item.menuTitle}
                                </p>
                            )
                        }
                        else {
                            return (
                                <p 
                                    className={cn("text-[12px] cursor-pointer duration-200", item.focused && "text-[var(--border-light-dark)]")}
                                    onClick={() => {
                                        router.push(item.path);
                                    }}
                                    key={index}
                                >
                                    {item.menuTitle + " >"}
                                </p>
                            )
                        }
                    })
                }
            </div>

            <div className="flex gap-[10px] text-[var(--border-light-dark)] cursor-pointer hover:text-[var(--foreground-rgb)] [&:hover>div]:border-[var(--foreground-rgb)] duration-100">
                <Search width={15}/>
                <div className="flex items-center px-[5px] gap-[5px] border-[0.5px] border-[var(--border-light-dark)] rounded-[3px]">
                    <Command width={12} />
                    <p className="text-[12px]">+ K</p>
                </div>
            </div>
        </div>
    )
}

export default PageNav;