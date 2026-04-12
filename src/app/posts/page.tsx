import { getAllPosts } from "@/api/search/route"
import DataSetter from "@/components/common/DataSetter";
import PostCard from "@/components/common/PostCard";
import { Clipboard } from "lucide-react";

export default async function PostsPage() {
    const source = await getAllPosts();

    return (
        <div className='flex flex-col h-screen px-[50px] py-[50px] gap-[40px]'>
                <div className='flex flex-col gap-[5px]'>
                    <div className='flex w-[80%] text-[var(--foreground-rgb)] text-[30px] font-extrabold gap-[10px]'>
                        <p>전체 포스트</p>
                    </div>

                    <div className='flex items-center text-[var(--border-light)]'>
                        <Clipboard height={12}/>
                        <p className='text-[12px] font-light'>
                            Total Posts found : {source.totalNum}
                        </p>  
                    </div>
                </div>
                
                <div className='grid grid-cols-3 pb-[50px] gap-[30px]'>
                    {
                    (source as any)?.list && 
                    (source as any)?.list.map((item, index) => {
                        return(
                            <PostCard key={index} {...item} path={`/posts/${item.type}/${item.pageId}`}/>
                        )
                    })
                    }
                </div>
                <DataSetter
                    storeDataList={source?.list ? source.list : []}
                />
            </div>
    )
}