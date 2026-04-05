import React from 'react'

import ArrowRightCircle from "../../../../public/svg/arrowRightCircle.svg";
import { cn } from '@/utils/cn';

interface MainButtonProps {
    text: string,
    onClick: () => void,
    style?: string
}

function MainButton({ text, onClick, style } : MainButtonProps) {
  return (
    <button 
        className={cn('flex items-center w-fit max-w-[180px] px-[15px] py-[10px] gap-[15px] border-[0.5px] border-[var(--foreground-rgb)] rounded-[10px] duration-200 hover:bg-[rgba(255,255,255,0.2)]', style ? style : "")}
        onClick={onClick}
    >
        <span className={cn('text-[16px] font-light')}>{text}</span>
        <ArrowRightCircle/>
    </button>
  )
}

export default MainButton