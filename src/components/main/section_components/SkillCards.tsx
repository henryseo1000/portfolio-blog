import { SkillTypes } from '@/types/skillTypes';
import SkillArrow from '../../../../public/svg/skillArrow.svg'

function SkillCards({name, skill_level, svg, description} : SkillTypes) {

    const generateTag = () => {

        switch (skill_level){
            case "high" :
                return <p className='max-w-fit px-[5px] py-[2px] text-[14px] font-normal text-[rgba(0,156,39)] text-center border-[1px] border-solid border-[rgba(0,156,39)] rounded-[15px] bg-[rgba(0,156,39,0.2)]'>역량/전문성: 높음</p>

            case "normal" :
                return <p className='max-w-fit px-[5px] py-[2px] text-[14px] font-normal text-[rgba(203,169,0)] text-center border-[1px] border-solid border-[rgba(203,169,0)] rounded-[15px] bg-[rgba(203,169,0,0.2)]'>역량/전문성: 보통</p>

            case "low" :
                return <p className='max-w-fit px-[5px] py-[2px] text-[14px] font-normal text-[rgba(182,3,0)] text-center border-[1px] border-solid border-[rgba(182,3,0)] rounded-[15px] bg-[rgba(182,3,0,0.2)]'>역량/전문성: 낮음</p>
        }
    }

    return (
        <div className='flex justify-between w-[240px] h-[160px] px-[20px] py-[10px] border-[0.5px_solid_var(--border-light)] rounded-[10px] bg-[var(--foreground-rgb)] select-none cursor-pointer'>
            <div className='flex flex-col justify-center gap-[5px]'>
                <div className='flex items-center gap-[5px]'>
                    {svg}
                    <span className='text-[var(--background-plain)] text-[20px] font-extrabold'>{name}</span>
                </div>

                {generateTag()}

                <p className='text-[var(--border-light)] text-[14px]'>{description}</p>
            </div>

            <div className='flex items-center h-full'>
                <SkillArrow />
            </div>
        </div>
    )
}

export default SkillCards