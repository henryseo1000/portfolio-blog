'use client';

import { useSearchParams } from 'next/navigation';
import { isTypedArray } from 'util/types';

interface PostCardProps {
    type?: any;
    pageId?: string; 
    date?: string; 
    thumbnailPath: string;
    title: string;
    path: string;
}

function PostCard({ type, pageId, date, thumbnailPath, title, path } : PostCardProps) {

    return (
        <a
            className='flex flex-col relative justify-center w-full h-[275px] text-[18px] font-semibold border-[0.5px] border-[#4C4C4C] bg-[#393939] rounded-[10px] duration-300 overflow-hidden hover:opacity-50'
            href={path + `?title=${title}`}
        >
            <img
                className='flex h-[calc(100%_-_95px)] rounded-[0px] object-cover'
                src={thumbnailPath}
                alt='thumbnail'
            />

            <div 
                className='flex flex-col justify-center h-[95px] px-[20px] py-[10px] gap-[3px]'
            >
                <p className='whitespace-nowrap text-ellipsis overflow-hidden'>{title}</p>
                {date && <p className='text-[12px] font-thin'>날짜 : {date}</p>}
                <p className='text-[12px] font-thin'>작성자 : 서호준</p>
            </div>

            {(type && type.map) ?
                <div className='flex absolute top-[10px] left-[10px] gap-[5px]'>
                    {type.map((item, index) => {
                        return (
                                <p 
                                    className='px-[5px] py-[3px] text-[12px] bg-[var(--background-basic)] rounded-[5px]'
                                    key={index}
                                >
                                    {item}
                                </p>
                        )
                    })}
                </div>
                :
                <p className='absolute top-[10px] left-[10px] px-[5px] py-[3px] text-[12px] bg-[var(--background-basic)] rounded-[5px]'>{type}</p>
            }
        </a>
    )
}

export default PostCard