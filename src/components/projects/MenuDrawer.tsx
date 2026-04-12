'use client';

import { cn } from '@/utils/cn'
import { GitBranchIcon, HomeIcon, InfoIcon, PaperclipIcon, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react'

interface MenuDrawerProps {
    ref : MutableRefObject<HTMLDivElement>
    open : boolean
    setOpen : Dispatch<SetStateAction<boolean>>,
}

function MenuDrawer({ ref, open, setOpen } : MenuDrawerProps) {
    const [focused, setFocused] = useState<string>();
    const location = usePathname();
    const router = useRouter();

    const handleFocused = () => {
        if(location.split('/')[1]) {
            setFocused(location.split('/')[1])
        }
        else {
            setFocused('main')
        }
    }

    useEffect(() => {
        handleFocused();
    }, [location])

    return (
        <div 
            className={cn('flex fixed items-center left-0 w-[300px] h-screen px-[20px] py-[50px] bg-[rgba(0,0,0,0.8)] backdrop-blur-xl duration-300 translate-y-[calc(50%-40px)] translate-x-[-105%]', open && "translate-x-[0%]")}
            ref={ref}
        >
            <X className='absolute top-[25px] right-[25px] cursor-pointer'
                onClick={() => setOpen(false)}
            />

            <div className='flex flex-col items-center justify-center w-[calc(100%_-_20px)] gap-[20px] text-[15px] '>
                <div 
                    className={cn('flex gap-[5px] text-[var(--border-light)] select-none cursor-pointer hover:text-[var(--foreground-rgb)]', focused === 'main' && "text-[var(--foreground-rgb)]")}
                    onClick={() => {
                        router.push('/')
                        setOpen(false)
                    }}
                >
                    <HomeIcon height={20}/>
                    <p>Main</p>
                </div>
                <div 
                    className={cn('flex gap-[5px] text-[var(--border-light)] select-none cursor-pointer hover:text-[var(--foreground-rgb)]', focused === 'about' && "text-[var(--foreground-rgb)]")}
                    onClick={() => {
                        router.push('/about')
                        setOpen(false)
                    }}
                >
                    <InfoIcon height={20}/>
                    <p>About</p>
                </div>
                <div 
                    className={cn('flex gap-[5px] text-[var(--border-light)] select-none cursor-pointer hover:text-[var(--foreground-rgb)]', focused === 'projects' && "text-[var(--foreground-rgb)]")}
                    onClick={() => {
                        router.push('/projects')
                        setOpen(false)
                    }}
                >
                    <GitBranchIcon height={20}/>
                    <p>Projects</p>
                </div>
                <div 
                    className={cn('flex gap-[5px] text-[var(--border-light)] select-none cursor-pointer hover:text-[var(--foreground-rgb)]', focused === 'posts' && "text-[var(--foreground-rgb)]")}
                    onClick={() => {
                        router.push('/posts')
                        setOpen(false)
                    }}
                >
                    <PaperclipIcon height={20}/>
                    <p>Posts</p>
                </div>
            </div>
        </div>
    )
}

export default MenuDrawer