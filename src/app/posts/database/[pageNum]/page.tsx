import { getFileNum } from '@/api/search/route';
import dynamic from 'next/dynamic';

import ArrowLeft from "../../../../../public/svg/arrowLeft.svg";
import ArrowRight from "../../../../../public/svg/arrowRight.svg";

import './globals.css';

export default async function PageNum(props : any) {
    const { pageNum } = await props.params;

    const DynamicComponent = dynamic(() => import(`../(markdowns)/${pageNum}.md`).then((comp) => {
        return comp;
    }));

    return (
        <div className='flex flex-col gap-[15px]'>
            <div className='flex flex-col px-[40px] pt-[70px] pb-[45px] gap-[10px] border-[#4c4c4c] border-[0.5px] rounded-[20px] bg-[#2A2A2A]'>
                <DynamicComponent/>
            </div>

            <div className='flex justify-between w-full h-[80px] gap-[15px]'>
                <div className='flex items-center justify-between w-[250px] h-full px-[30px] bg-[#2A2A2A] border-[0.5px] border-[#4C4C4C] rounded-[20px] cursor-pointer'>
                    <ArrowLeft className='h-[20px]'/>
                    <div className='flex flex-col gap-[5px] text-right'>
                        <p className='text-[#B3B3B3] text-[13px] font-bold'>이전 글</p>
                        <p className='text-[#B3B3B3] text-[13px] font-light'>이전 글 제목이 들어갈 부분</p>
                    </div>
                </div>
                {/* <div className='flex items-center justify-between grow h-full px-[30px] bg-[#2A2A2A] border-[0.5px] border-[#4C4C4C] rounded-[20px]'>

                </div> */}
                <div className='flex items-center justify-between w-[250px] h-full px-[30px] bg-[#2A2A2A] border-[0.5px] border-[#4C4C4C] rounded-[20px] cursor-pointer'>
                    <div className='flex flex-col gap-[5px]'>
                        <p className='text-[#B3B3B3] text-[13px] font-bold'>다음 글</p>
                        <p className='text-[#B3B3B3] text-[13px] font-light'>다음 글 제목이 들어갈 부분</p>
                    </div>
                    <ArrowRight className='h-[20px]'/>
                </div>
            </div>
        </div>
    )
}