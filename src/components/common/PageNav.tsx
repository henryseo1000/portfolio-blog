'use client';

import projectsList from "@/data/project";

import { PageNavProps } from "@/types/navTypes";
import { cn } from "@/utils/cn";
import { Menu, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import SearchPalette from "./SearchPalette";
import MenuDrawer from "../projects/MenuDrawer";

function PageNav() {
    const [menus, setMenus] = useState<PageNavProps[]>([]);
    const [focused, setFocused] = useState<number>();
    const [open, setOpen] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const location = usePathname();
    const router = useRouter();
    
    const dialogRef = useRef<HTMLDialogElement>();
    const drawerRef = useRef<HTMLDivElement>();

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
                            menuTitle : searchParams.get('title'),
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
        handleLocation();
    }, [location])

    return (
        <div className='flex fixed items-center justify-between top-0 w-full h-[75px] px-[30px] border-b-[0.5px] border-b-[var(--background-basic-light)] bg-[rgba(0,0,0,0.2)] backdrop-blur-3xl z-10'>
            <div className="flex items-center gap-[5px]">
                <Menu
                    className="cursor-pointer"
                    onClick={() => {setDrawerOpen(!drawerOpen)}}
                    width={17}
                />
                {
                    menus?.map((item, index) => {
                        if (index === menus.length - 1) {
                            return (
                                <p 
                                    className={cn("text-[14px] cursor-pointer duration-200", index !== focused && "text-[var(--border-light-dark)] hover:text-[var(--border-light)]")}
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
                                    className={cn("text-[14px] cursor-pointer duration-200", index !== focused && "text-[var(--border-light-dark)] hover:text-[var(--border-light)]")}
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

            <div 
                className="flex gap-[5px] text-[var(--border-light-dark)] cursor-pointer hover:text-[var(--foreground-rgb)] [&:hover>div]:border-[var(--foreground-rgb)] duration-100"
                onClick={() => {
                    if (dialogRef.current) {
                        if (!open) {
                            dialogRef.current.showModal();
                            document.body.classList.add('overflow-hidden');
                            setOpen(!open);
                        }
                        else {
                            setOpen(!open);
                            setTimeout(() => {
                                dialogRef.current.close();
                                document.body.classList.remove('overflow-hidden');
                            }, 300)
                        }
                    }
                }}
            >
                <Search width={20} strokeWidth={1}/>
                <div className="flex items-center justify-center px-[5px] gap-[5px] border-[0.5px] border-[var(--border-light-dark)] rounded-[3px]">
                    <p className="text-[12px]">Cmd+K</p>
                    <p className="text-[12px]">or</p>
                    <p className="text-[12px]">Ctl+K</p>
                </div>
            </div>
            <SearchPalette
                ref={dialogRef}
                open={open}
                setOpen={setOpen}
            />
            <MenuDrawer
                ref={drawerRef}
                open={drawerOpen}
                setOpen={setDrawerOpen}
            />
        </div>
    )
}

export default PageNav;