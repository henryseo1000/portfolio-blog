import { getAllPosts } from "@/api/search/route"
import { postCategoryList } from "@/data/postCategory";
import { Clipboard } from "lucide-react";

export default async function PostsPage() {
    const source = await getAllPosts();

    return (
        <div className='flex flex-col h-screen px-[50px] py-[120px] gap-[40px]'>
                <div className='flex flex-col gap-[5px]'>
                    <div className='flex w-[80%] text-[var(--foreground-rgb)] text-[40px] font-extrabold gap-[10px]'>
                        <p>전체 포스트</p>
                    </div>

                    <div className='flex items-center text-[var(--border-light)]'>
                        <Clipboard height={16}/>
                        <p className='font-light'>
                            Total Posts found : {source.totalNum}
                        </p>  
                    </div>
                </div>
                
                <div className='grid grid-cols-3 pb-[50px] gap-[30px]'>
                    {
                    (source as any)?.list && 
                    (source as any)?.list.map((item, index) => {
                        return(
                            <a
                                className='flex flex-col justify-center w-full h-[250px] text-[18px] font-semibold border-[0.5px] border-[#4C4C4C] bg-[#393939] rounded-[10px] duration-300 overflow-hidden hover:opacity-50'
                                href={`/posts/${item.type}/${item.pageId}`}
                                key={index}
                            >
                                <img
                                    className='flex h-[calc(100%_-_80px)] rounded-[0px] object-cover'
                                    src={item.thumbnailPath}
                                    alt='thumbnail'
                                />

                                <div className='flex flex-col justify-center h-[80px] px-[20px] py-[10px]'>
                                    <p className='whitespace-nowrap text-ellipsis overflow-hidden'>{item.title}</p>
                                    <p className='text-[12px] font-thin'>작성자 : 서호준</p>
                                </div>
                            </a>
                        )
                    })
                    }
                </div>
            </div>
    )
}