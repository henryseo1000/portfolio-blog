import { getDatabasePagelist, notionToPage } from '@/api/search/route';

import ArrowLeft from "../../../../public/svg/arrowLeft.svg";
import ArrowRight from "../../../../public/svg/arrowRight.svg";

import './globals.css';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

export default async function BlogPost({ params }) {
    const slug = await params;
    const source = Number(slug.postRoute[1]) ? 
        await notionToPage(slug.postRoute[0], Number(slug.postRoute[1]) - 1) 
        : 
        await getDatabasePagelist(slug.postRoute[0])

    const getKeysAndConvert = () => {
        if ((source as any)?.frontmatter) {
            const keyArr = Object.keys((source as any)?.frontmatter);
            const len = keyArr?.length;
            let buf = [];
            
            for (let i = 0; i < len; i++) {
                if((source as any)?.frontmatter[keyArr[i]] !== "" &&
                    (source as any)?.frontmatter[keyArr[i]] !== null &&
                    ((source as any)?.frontmatter[keyArr[i]] as Array<any>)?.length !== 0
                ) {
                    switch (true) {
                    case "URL" === keyArr[i] || "파일과 미디어" === keyArr[i]:
                        buf.push(
                            <p key={i} className='default_fronts urls'>
                                {keyArr[i]} :
                                {
                                ((source as any)?.frontmatter[keyArr[i]] as Array<any>)?.map ? 

                                    ((source as any)?.frontmatter[keyArr[i]] as Array<any>)?.map((item, index) => {
                                        return (
                                            <a href={`${item}`} key={index}>{item}</a>
                                        )
                                    })
                                :

                                    <span>{(source as any)?.frontmatter[keyArr[i]] as ReactNode}</span>

                                }
                            </p>
                        )
                        break;

                    case "Name" === keyArr[i] ||  "이름" === keyArr[i]:
                        buf = [<h1 key={i} className='default_fronts title'>{(source as any)?.frontmatter[keyArr[i]] as string}</h1>].concat(buf)
                        break;

                    case "Assign" === keyArr[i]:
                        buf.push(<p key={i} className='default_fronts title'>작성자: {(source as any)?.frontmatter[keyArr[i]] as string}</p>)
                        break;

                    case "Tags" === keyArr[i] || "태그" === keyArr[i]:
                        buf.push(
                            <p key={i} className='default_fronts tags'>
                                {keyArr[i]} :
                                {
                                ((source as any)?.frontmatter[keyArr[i]] as Array<any>)?.map ? 

                                    ((source as any)?.frontmatter[keyArr[i]] as Array<any>)?.map((item, index) => {
                                        return (
                                            <span 
                                                className='mr-[5px] px-[5px] py-[5px] border-[0.5px] border-[var(--foreground-rgb)] rounded-[15px]' 
                                                key={index}
                                            >
                                                {item}
                                            </span>
                                        )
                                    })
                                :

                                    <span>{(source as any)?.frontmatter[keyArr[i]] as ReactNode}</span>

                                }
                            </p>
                        )
                        break;
                    default:
                        buf.push(
                            <p key={i} className='default_fronts'>
                                {keyArr[i]}: {(source as any)?.frontmatter[keyArr[i]] as string}
                            </p>
                        )
                }
            }
                            
            }
            return buf;
        }
        else {
            return [];
        }
    }

    if ((isNaN(slug.postRoute[1]) && slug.postRoute[1] !== undefined) ||
        (slug.postRoute[1] && (source as any)?.content === undefined)
    ) {
        return redirect(`/posts/${slug.postRoute[0]}`)
    }
    else if (!slug.postRoute[1]){
        return (
            <div className='flex flex-col items-center h-screen py-[50px] gap-[15px] overflowy-scroll'>
                <p className='text-[40px] font-extrabold'>
                    {slug.postRoute[0]} 관련 포스트 검색 결과
                </p>
                <div className='flex flex-col gap-[15px]'>
                    {
                    (source as any)?.list && 
                    (source as any)?.list.map((item, index) => {
                        return(
                            <a
                                className='underline hover:opacity-50'
                                href={`/posts/${slug.postRoute[0]}/${index + 1}`}
                                key={index}
                            >
                                {item}
                            </a>
                        )
                    })
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-[15px]'>
            <div className={cn('flex flex-col px-[40px] pt-[70px] pb-[45px] gap-[10px] border-[#4c4c4c] border-[0.5px] rounded-[20px] bg-[#2A2A2A]', (source as any)?.content === undefined && "h-[calc(100vh_-_30px)]")}>
                <div className='flex flex-col mb-[30px] gap-[5px]'>
                    {(source as any)?.content && getKeysAndConvert()?.map((item) => {
                        return item;
                    })}
                </div>
                { (source as any)?.content ? 
                    (source as any).content 
                    : 
                    <p className='w-full pb-[45px] text-center text-[#4c4c4c]'>포스트가 없습니다</p>
                }
            </div>
            {  (source as any)?.content &&

                <div className='flex justify-between w-full h-[80px] gap-[15px]'>
                    <a
                        className={cn('flex items-center justify-between w-[250px] h-full px-[30px] bg-[#2A2A2A] border-[0.5px] border-[#4C4C4C] rounded-[20px] cursor-pointer', 
                            (Number(slug.postRoute[1]) === 1) && "pointer-events-none cursor-default opacity-45")}
                        href={`${Number(slug.postRoute[1]) - 1}`}
                    >
                        <ArrowLeft className='h-[20px]'/>
                        {   Number(slug.postRoute[1]) !== 1 ?
                            <div className='flex flex-col gap-[5px] text-right'>
                                <p className='text-[#B3B3B3] text-[13px] font-bold'>이전 글</p>
                                <p className='text-[#B3B3B3] text-[13px] font-light'>이전 글 제목이 들어갈 부분</p>
                            </div>
                            :
                            <div className='flex flex-col gap-[5px] text-right'>
                                <p className='text-[#B3B3B3] text-[13px] font-light'>첫 글입니다</p>
                            </div>
                        }
                    </a>

                    
                    <a
                        className={cn('flex items-center justify-between w-[250px] h-full px-[30px] bg-[#2A2A2A] border-[0.5px] border-[#4C4C4C] rounded-[20px] cursor-pointer', 
                            source?.totalNum === Number(slug.postRoute[1]) && "pointer-events-none cursor-default opacity-45")}
                        href={`${Number(slug.postRoute[1]) + 1}`}
                    >   
                        {!(source?.totalNum === Number(slug.postRoute[1])) ?
                            <div className='flex flex-col gap-[5px]'>
                                <p className='text-[#B3B3B3] text-[13px] font-bold'>다음 글</p>
                                <p className='text-[#B3B3B3] text-[13px] font-light'>다음 글 제목이 들어갈 부분</p>
                            </div>
                            :
                            <div className='flex flex-col gap-[5px]'>
                                <p className='text-[#B3B3B3] text-[13px] font-light'>마지막 글입니다</p>
                            </div>
                        }
                        <ArrowRight className='h-[20px]'/>
                    </a>
                    
                </div>
            }
        </div>
    )
}