'use client';

import projectsList from "@/data/project";
import { PageNavProps } from "@/types/navTypes";
import { cn } from "@/utils/cn";

import { Command, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function PageNav() {
    const [menus, setMenus] = useState<PageNavProps[]>([]);
    const [focused, setFocused] = useState<number>();
    const [open, setOpen] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");

    const searchParams = useSearchParams();
    const location = usePathname();
    const router = useRouter();
    
    const dialogRef = useRef<HTMLDialogElement>();

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

    const handleKeyboard = (e : KeyboardEvent) => {
        if(e.metaKey && e.keyCode === 75) {
            if (dialogRef.current) {
                if (!open) {
                    dialogRef.current.showModal();
                    document.body.classList.add('overflow-hidden');
                }
                else {
                    setOpen(!open);
                    setTimeout(() => {
                        dialogRef.current.close();
                        document.body.classList.remove('overflow-hidden');
                    }, 300)
                }
            }
            setOpen(!open);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyboard, false);

        return () => window.removeEventListener('keydown', handleKeyboard, false);
    }, [open])

    useEffect(() => {

    }, [focused, menus]);

    useEffect(() => {
        handleLocation();
    }, [location])

    return (
        <div className='flex fixed items-center justify-between top-0 w-full h-[75px] px-[30px] border-b-[0.5px] border-b-[var(--background-basic-light)] bg-[rgba(0,0,0,0.2)] backdrop-blur-3xl z-10'>
            <div className="flex items-center gap-[5px]">
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
                className="flex gap-[10px] text-[var(--border-light-dark)] cursor-pointer hover:text-[var(--foreground-rgb)] [&:hover>div]:border-[var(--foreground-rgb)] duration-100"
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
                <Search width={15}/>
                <div className="flex items-center px-[5px] gap-[5px] border-[0.5px] border-[var(--border-light-dark)] rounded-[3px]">
                    <Command width={12} />
                    <p className="text-[12px]">+ K</p>
                </div>
            </div>
            <dialog 
                className={cn("w-[70%] h-[400px] top-[-200%] border-[0.5px] border-[var(--border-light-dark)] rounded-[20px] bg-[rgba(255,255,255,0.1)] backdrop-blur-xl duration-300 overflow-hidden outline-none focus:outline-none", open && "top-[none] backdrop:bg-black/50")}
                ref={dialogRef}
            >   
                <div>
                    <input
                        className="w-full h-[60px] px-[30px] text-[15px] text-[var(--foreground-rgb)] border-b-[0.5px] border-[var(--border-light-dark)] bg-transparent outline-none focus:outline-none"
                        type="text"
                        placeholder="검색할 내용을 입력하세요..."
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                        }}
                        value={searchInput}
                    />
                    <div>
                        
                    </div>
                </div>
                <button
                    className=""
                    onClick={() => {
                        if(dialogRef.current) {
                            setOpen(!open);
                            setTimeout(() => {
                                dialogRef.current.close();
                                document.body.classList.remove('overflow-hidden');
                            }, 300)
                        }
                    }}
                >
                    <X className="absolute top-[17px] right-[17px] text-[var(--foreground-rgb)] duration-300 opacity-50 hover:opacity-100"/>
                </button>
            </dialog>
        </div>
    )
}

export default PageNav;