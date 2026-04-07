import { getDatabasePagelist, notionToPage } from '@/api/search/route';

import ArrowLeft from "../../../../public/svg/arrowLeft.svg";
import ArrowRight from "../../../../public/svg/arrowRight.svg";

import { redirect } from 'next/navigation';
import { cn } from '@/utils/cn';
import { Fragment, ReactNode } from 'react';
import { Clipboard } from 'lucide-react';
import Comments from '@/components/posts/Comments';
import { postCategoryList } from '@/data/postCategory';
import MainButton from '@/components/main/section_components/MainButton';

export default async function BlogPost({ params }) {
    const slug = await params;
    const source = slug.postRoute[1] !== undefined ?
        await notionToPage(slug.postRoute[0], slug.postRoute[1]) 
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

    if ((slug.postRoute[1] && (source as any)?.content === undefined) ||
        (slug.postRoute[0] && postCategoryList.filter((item) => {return item.path === slug.postRoute[0]}).length === 0)
    ) {
        return (
            <div className='flex flex-col items-center justify-center w-full h-screen'>
                <p className=''>존재하지 않는 페이지입니다!</p>
                <a className='text-[var(--border-light)] underline' href="/posts">포스팅 홈으로 돌아가기</a>
            </div>
        )
    }
    else if (!slug.postRoute[1]){
        return (
            <div className='flex flex-col h-screen px-[50px] py-[50px] gap-[40px]'>
                <div className='flex flex-col gap-[5px]'>
                    <div className='flex w-[80%] text-[var(--border-light)] text-[40px] font-extrabold gap-[10px]'>
                        <p className='text-transparent [-webkit-text-stroke:1px_var(--border-light)]'>{slug.postRoute[0]}</p>
                        <p>관련 포스트 조회 결과</p>
                    </div>

                    <div className='flex items-center text-[var(--border-light-dark)]'>
                        <Clipboard height={16}/>
                        <p className='font-light'>
                            Total Posts found : {source.totalNum}
                        </p>  
                    </div>
                </div>
                
                <div className='flex flex-col pb-[50px] gap-[15px]'>
                    {
                    (source as any)?.list && 
                    (source as any)?.list.map((item, index) => {
                        return(
                            <a
                                className='flex flex-col justify-center w-full h-[100px] px-[30px] text-[18px] font-semibold bg-[#393939] rounded-[10px] duration-300 hover:opacity-50'
                                href={`/posts/${slug.postRoute[0]}/${item.pageId}`}
                                key={index}
                            >
                                <p>{item.title}</p>
                                <p className='text-[12px] font-thin'>작성자 : 서호준</p>
                            </a>
                        )
                    })
                    }
                </div>
            </div>
        )
    }

    return (
        <Fragment>
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
                            !(source as any)?.prevPage.pageId && "pointer-events-none cursor-default opacity-45")}
                        href={`${(source as any)?.prevPage.pageId ? (source as any)?.prevPage.pageId : ""}`}
                    >
                        <ArrowLeft className='h-[20px]'/>
                        {   (source as any)?.prevPage?.pageId ?
                            <div className='flex flex-col w-full gap-[5px] text-right'>
                                <p className='text-[#B3B3B3] text-[13px] font-bold'>이전 글</p>
                                <p className='max-w-[calc(100%_-_15px)] text-[#B3B3B3] text-[13px] font-light text-ellipsis line-clamp-1 overflow-hidden'>{(source as any)?.prevPage.title}</p>
                            </div>
                            :
                            <div className='flex flex-col gap-[5px] text-right'>
                                <p className='text-[#B3B3B3] text-[13px] font-light'>첫 글입니다</p>
                            </div>
                        }
                    </a>

                    
                    <a
                        className={cn('flex items-center justify-between w-[250px] h-full px-[30px] bg-[#2A2A2A] border-[0.5px] border-[#4C4C4C] rounded-[20px] cursor-pointer', 
                            !(source as any)?.nextPage.pageId && "pointer-events-none cursor-default opacity-45")}
                        href={`${(source as any)?.nextPage.pageId ? (source as any)?.nextPage.pageId : ""}`}
                    >   
                        { (source as any)?.nextPage?.pageId  ?
                            <div className='flex flex-col w-full gap-[5px]'>
                                <p className='text-[#B3B3B3] text-[13px] font-bold'>다음 글</p>
                                <p className='max-w-[calc(100%_-_15px)] text-[#B3B3B3] text-[13px] font-light text-ellipsis line-clamp-1 overflow-hidden'>{(source as any)?.nextPage.title}</p>
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
        <Comments theme="github-dark"/>
        </Fragment>
    )
}