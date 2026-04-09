'use client';

import projectsList from "@/data/project";
import { PageNavProps } from "@/types/navTypes";
import { cn } from "@/utils/cn";

import { Command, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PageNav() {
    const [menus, setMenus] = useState<PageNavProps[]>([]);
    const [focused, setFocused] = useState<number>(); 
    const location = usePathname();
    const router = useRouter();

    const handleLocation = async () => {
        const buf = []
        if (location.split('/').length > 0) {
            switch (true) {
                case location.split('/')[1] === 'projects':
                    buf.push({menuTitle : 'Project View', path: "/projects"});
                    setFocused(0);

                    if (location.split('/')[2] && !isNaN(Number(location.split('/')[2]))) {
                        if (Number(location.split('/')[2]) <= projectsList.length) {
                            buf.push({
                                menuTitle : projectsList[Number(location.split('/')[2]) - 1].title,
                                path: `/projects/${Number(location.split('/')[2])}`
                            })
                            setFocused(1)
                        }
                    }

                    if (location.split('/')[3] && !isNaN(Number(location.split('/')[2]))) {

                        buf.push({
                            menuTitle : location.split('/')[3],
                            path: `/projects/${location.split('/')[3]}`
                        })
                        setFocused(2)
                    }
                    break;

                case location.split('/')[1] === 'posts':
                    buf.push({menuTitle : 'Posts Home', path: "/posts"})
                    break;
            }
        }

        setMenus(buf);
    }

    useEffect(() => {

    }, [focused, menus]);

    useEffect(() => {
        handleLocation();
    }, [location])

    return (
        <div className='flex fixed items-center justify-between top-0 w-full h-[75px] px-[30px] border-b-[0.5px] border-b-[var(--border-light-dark)] backdrop-blur-3xl z-10'>
            <div className="flex items-center gap-[5px]">
                {
                    menus?.map((item, index) => {
                        if (index === menus.length - 1) {
                            return (
                                <p 
                                    className={cn("text-[12px] cursor-pointer duration-200", index !== focused && "text-[var(--border-light-dark)] hover:text-[var(--border-light)]")}
                                    onClick={() => {
                                        setFocused(index);
                                        if (focused < index) {
                                            setMenus(menus.splice(0, menus.length - index))
                                        }
                                        router.replace(item.path);
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
                                    className={cn("text-[12px] cursor-pointer duration-200", index !== focused && "text-[var(--border-light-dark)] hover:text-[var(--border-light)]")}
                                    onClick={() => {
                                        setFocused(index);
                                        if (focused < index) {
                                            setMenus(menus.splice(0, menus.length - index))
                                        }
                                        router.replace(item.path);
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