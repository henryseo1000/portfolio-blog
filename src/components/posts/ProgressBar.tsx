'use client';

import { cn } from '@/utils/cn';
import React, { useEffect, useRef, useState } from 'react'

interface ProgressBarProps {
    position? : "top" | "bottom",
    barColor?: string
}

function ProgressBar({ position = "top", barColor = "#b3b3b3" } : ProgressBarProps) {
    const barRef = useRef<HTMLDivElement>(null);

    const handleBarProgress = () => {
        const height = Math.max(document.body.scrollHeight, 
            document.body.offsetHeight,
            document.body.scrollHeight,
            document.documentElement.clientHeight, 
            document.documentElement.scrollHeight, 
            document.documentElement.offsetHeight,
        );

        const barWidth = (document.documentElement.scrollTop / (height - window.innerHeight) * window.innerWidth);

        if(barRef.current) {
            barRef.current.style.width = `${barWidth}px`
        }
    }

    useEffect(() => {
        handleBarProgress();
        document?.addEventListener('scroll', handleBarProgress);

        return () => document?.removeEventListener('scroll', handleBarProgress);
    }, [])

    return (
        <div 
            className={cn(`left-0 max-w-full border-[1.5px] border-[${barColor}] `, position === "top" ? "fixed top-0" : "absolute bottom-0")}
            ref={barRef}
        />
    )
}

export default ProgressBar