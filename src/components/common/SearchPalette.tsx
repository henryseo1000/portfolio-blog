'use client';

import { RootState } from '@/store';
import { cn } from '@/utils/cn'
import { X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { Dispatch, LegacyRef, MutableRefObject, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { div } from 'three/src/nodes/math/OperatorNode.js';

interface SearchPaletteProps {
    ref : MutableRefObject<HTMLDialogElement>
    open : boolean
    setOpen : Dispatch<SetStateAction<boolean>>
}

function SearchPalette({ ref, open, setOpen } : SearchPaletteProps) {
    const [searchInput, setSearchInput] = useState<string>("");
    const [filteredList, setFilteredList] = useState<any[]>([]);

    const storedData = useSelector((state: RootState) => state.pageData.storeDataList)

    const router = useRouter();
    const location = usePathname();

    const handleKeyboard = (e : KeyboardEvent) => {
        if(e.metaKey && e.keyCode === 75) {
            if (ref.current) {
                if (!open) {
                    ref.current.showModal();
                    document.body.classList.add('overflow-hidden');
                }
                else {
                    setOpen(!open);
                    setTimeout(() => {
                        ref.current.close();
                        document.body.classList.remove('overflow-hidden');
                    }, 300)
                }
            }
            setOpen(!open);
        }
        else if(e.ctrlKey && e.keyCode === 75) {
            if (ref.current) {
                if (!open) {
                    ref.current.showModal();
                    document.body.classList.add('overflow-hidden');
                }
                else {
                    setOpen(!open);
                    setTimeout(() => {
                        ref.current.close();
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
        setFilteredList(storedData.filter((item) => {
            return item?.title?.toLowerCase().replaceAll(' ', '').includes(searchInput.toLocaleLowerCase().replaceAll(' ', ''))
        }))
    },[searchInput, storedData]);

    return (
        <dialog 
            className={cn("w-[70%] h-[400px] top-[-200%] border-[0.5px] border-[var(--border-light-dark)] rounded-[20px] bg-[rgba(255,255,255,0.1)] backdrop-blur-xl duration-300 overflow-hidden outline-none focus:outline-none", open && "top-[none] backdrop:bg-black/50")}
            ref={ref}
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
                    <div
                        className="flex flex-col w-full h-[340px] overflow-scroll"
                    >
                        {filteredList.map((item, index) => {
                                return(
                                    <div
                                        className='flex items-center justify-between w-full px-[30px] py-[15px] text-[var(--border-light)] duration-300 hover:bg-[var(--border-dark)] cursor-pointer'
                                        key={index}
                                        onClick={() => {
                                            router.push(location.split('/')[1] === "projects" ? 'projects/' + item?.projectNum + '/' + item?.pageId + '?title=' + item?.title : item?.type + '/' + item?.pageId);
                                            if(ref.current) {
                                                setOpen(!open);
                                                setTimeout(() => {
                                                    ref.current.close();
                                                    document.body.classList.remove('overflow-hidden');
                                                }, 300)
                                            }
                                        }}
                                    >   
                                        <div
                                            className='flex flex-col'
                                        >
                                            <p
                                                className="select-none"
                                            >
                                                {item?.title}
                                            </p>
                                            <p className='text-[12px]'>{item?.date}</p>
                                        </div>
                                        
                                        <p className='px-[10px] py-[3px] text-[15px] bg-[var(--border-light-dark)] rounded-[5px]'>
                                            {item?.type}
                                        </p>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <button
                    onClick={() => {
                        if (ref.current) {
                            setOpen(!open);
                            setTimeout(() => {
                                ref.current.close();
                                document.body.classList.remove('overflow-hidden');
                            }, 300)
                        }
                    }}
                >
                <X className="absolute top-[17px] right-[17px] text-[var(--foreground-rgb)] duration-300 opacity-50 hover:opacity-100"/>
            </button>
        </dialog>
    )
}

export default SearchPalette