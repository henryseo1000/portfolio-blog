import { ReactNode } from "react";

const parseFrontmatter = (source) => {
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
                        buf = [<h1 key={i} className='default_fronts title text-center'>{(source as any)?.frontmatter[keyArr[i]] as string}</h1>].concat(buf)
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

export default parseFrontmatter;