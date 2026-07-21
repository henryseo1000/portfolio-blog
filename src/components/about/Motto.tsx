import { Flame } from 'lucide-react';

function Motto() {

    return (
        <div 
            className={`card1 flex flex-col justify-center absolute top-[50%] left-[50%] w-[50%] aspect-[7/4] p-[50px] gap-[30px] border-[1px] rounded-[10px] bg-[var(--foreground-rgb)] duration-200 shadow-lg translate-x-[-50%] translate-y-[-50%] rotate-[1deg] select-none`}
        > 
            <div className="flex items-center gap-[10px] text-[var(--background-basic)] text-[25px] font-bold">
                <Flame/>
                <p>MOTTO</p>
            </div>
            <div className="flex items-center justify-between w-full">

                    <div className="grid grid-cols-2 grid-rows-2 justify-center w-full gap-[10px] text-[var(--background-basic)] text-[15px]">
                        <div className='flex flex-col items-center justify-center w-full h-[100px] p-[10px] text-center border-[1px] border-[#000000] rounded-md'>
                            <p className='font-semibold'>창의적인, 혁신을 주도하는 개발자</p>
                            <p className='text-[12px] text-[#626262]'>세상에 변화를 줄 수 있는 것들을 개발하고<br/>항상 창의적인 생각을 할 수 있는 개발자</p>
                        </div>
                        <div className='flex flex-col items-center justify-center w-full h-[100px] p-[10px] text-center border-[1px] border-[#000000] rounded-md'>
                            <p className='font-semibold'>호기심을 가지고 최선을 다하는 개발자</p>
                            <p className='text-[12px] text-[#626262]'>항상 호기심을 가지고 탐구하며<br/>개발 중 생기는 어려움도 침착하게 극복</p>
                        </div>
                        <div className='flex flex-col items-center justify-center w-full h-[100px] p-[10px] text-center border-[1px] border-[#000000] rounded-md'>
                            <p className='font-semibold'>개발 + 인생을 즐기는 개발자</p>
                            <p className='text-[12px] text-[#626262]'>행복하게 살려고 노력하는 개발자</p>
                        </div>
                        <div className='flex flex-col items-center justify-center w-full h-[100px] p-[10px] text-center border-[1px] border-[#000000] rounded-md'>
                            <p className='font-semibold'>팀을 배려하며 이끄는 리더십을 갖춘 개발자</p>
                            <p className='text-[12px] text-[#626262]'>팀워크 시 팀원과의 관계도 중요하게 여기고<br/>소통하며 이끌어나갈 수 있는 개발자</p>
                        </div>
                    </div>

            </div>
        </div>
    )
}

export default Motto;