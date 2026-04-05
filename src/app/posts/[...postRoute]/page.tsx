import { notionToMarkdown, notionToPage } from '@/api/search/route';

import ArrowLeft from "../../../../public/svg/arrowLeft.svg";
import ArrowRight from "../../../../public/svg/arrowRight.svg";

import './globals.css';
import Link from 'next/link';

export default async function BlogPost({ params }) {
    const slug = await params;
    const source = await notionToPage(slug.postRoute[0], Number(slug.postRoute[1]) - 1)

    const getKeysAndConvert = () => {
        if (source?.frontmatter) {
            const keyArr = Object.keys(source.frontmatter);
            const len = keyArr?.length;
            let buf = [];
            
            for (let i = 0; i < len; i++) {
                if(source.frontmatter[keyArr[i]] !== "" &&
                    source.frontmatter[keyArr[i]] !== null &&
                    (source.frontmatter[keyArr[i]] as Array<any>)?.length !== 0
                ) {
                    switch (keyArr[i]) {
                    case "URL":
                        buf.push(
                            <p key={i} className='default_fronts urls'>
                                URL/자료:
                                {(source.frontmatter["URL"] as Array<any>)?.map((item, index) => {
                                    return (
                                        <a href={`${item}`} key={index}>{item}</a>
                                    )
                                })}
                            </p>
                        )
                        break;

                    case "Name" :
                        buf = [<h1 key={i} className='default_fronts title'>{source.frontmatter[keyArr[i]] as string}</h1>].concat(buf)
                        break;

                    case "Assign" :
                        buf.push(<p key={i} className='default_fronts title'>작성자: {source.frontmatter[keyArr[i]] as string}</p>)
                        break;

                    case "Tags" :
                        buf.push(
                            <div key={i} className='default_fronts tags flex gap-[5px]'>
                                태그: {(source.frontmatter.Tags as Array<any>).map((item, index) => {
                                    return (
                                        <p key={index}>{item}</p>
                                    )
                                })}
                            </div>
                        )
                        break;
                    default:
                        buf.push(
                            <p key={i} className='default_fronts'>
                                {keyArr[i]}: {source.frontmatter[keyArr[i]] as string}
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

    return (
        <div className='flex flex-col gap-[15px]'>
            <div className='flex flex-col px-[40px] pt-[70px] pb-[45px] gap-[10px] border-[#4c4c4c] border-[0.5px] rounded-[20px] bg-[#2A2A2A]'>
                <div className='flex flex-col mb-[30px] gap-[5px]'>
                    {source?.content && getKeysAndConvert()?.map((item, index) => {
                        return item
                    })}
                </div>
                {source?.content ? source.content : "포스트가 없습니다."}
            </div>

            <div className='flex justify-between w-full h-[80px] gap-[15px]'>
                <Link
                    className='flex items-center justify-between w-[250px] h-full px-[30px] bg-[#2A2A2A] border-[0.5px] border-[#4C4C4C] rounded-[20px] cursor-pointer'
                    href={`${Number(slug.postRoute[1]) - 1}`}
                >
                    <ArrowLeft className='h-[20px]'/>
                    <div className='flex flex-col gap-[5px] text-right'>
                        <p className='text-[#B3B3B3] text-[13px] font-bold'>이전 글</p>
                        <p className='text-[#B3B3B3] text-[13px] font-light'>이전 글 제목이 들어갈 부분</p>
                    </div>
                </Link>
                {/* <div className='flex items-center justify-between grow h-full px-[30px] bg-[#2A2A2A] border-[0.5px] border-[#4C4C4C] rounded-[20px]'>

                </div> */}
                <Link
                    className='flex items-center justify-between w-[250px] h-full px-[30px] bg-[#2A2A2A] border-[0.5px] border-[#4C4C4C] rounded-[20px] cursor-pointer'
                    href={`${Number(slug.postRoute[1]) + 1}`}
                >
                    <div className='flex flex-col gap-[5px]'>
                        <p className='text-[#B3B3B3] text-[13px] font-bold'>다음 글</p>
                        <p className='text-[#B3B3B3] text-[13px] font-light'>다음 글 제목이 들어갈 부분</p>
                    </div>
                    <ArrowRight className='h-[20px]'/>
                </Link>
            </div>
        </div>
    )
}