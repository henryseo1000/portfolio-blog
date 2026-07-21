import copyToClipBoard from '@/utils/copyToClipboard';
import { CopyIcon, InfoIcon } from 'lucide-react';

function Introduction() {

    return (
        <div 
            className={`card0 flex flex-col justify-center absolute top-[50%] left-[50%] w-[50%] aspect-[7/4] p-[50px] gap-[30px] border-[1px] rounded-[10px] bg-[var(--foreground-rgb)] duration-200 shadow-lg translate-x-[-50%] translate-y-[-50%] select-none`}
        >
            <div className="flex items-center gap-[10px] text-[var(--background-basic)] text-[25px] font-bold">
                <InfoIcon/>
                <p>INTRODUCTION</p>
            </div>
            <div className="flex justify-between w-full">
                <div className="flex flex-col">
                        <p className="text-[var(--background-basic)] text-[20px]">서호준 HOJUN SEO</p>
                        <p className="text-[var(--background-basic)] text-[15px] font-thin">Software Engineer</p>
                </div>
                <div>
                    <div className="flex items-center justify-center gap-[5px] text-[var(--background-basic)] text-[15px]">
                        <p>E-mail1 : henryseo1000@gmail.com</p>
                        <CopyIcon 
                            className="opacity-50 cursor-pointer" 
                            height={15}
                            onClick={() => {
                            copyToClipBoard("henryseo1000@gmail.com")
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-center gap-[5px] text-[var(--background-basic)] text-[15px]">
                        <p>E-mail2 : henryseo1000@naver.com</p>
                        <CopyIcon
                            className="opacity-50 cursor-pointer" 
                            height={15}
                            onClick={() => {
                            copyToClipBoard("henryseo1000@naver.com")
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Introduction