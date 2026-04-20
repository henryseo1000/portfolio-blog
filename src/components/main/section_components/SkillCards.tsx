import { SkillTypes } from '@/types/skillTypes';
import SkillArrow from '../../../../public/svg/skillArrow.svg'
import { div } from 'three/src/nodes/math/OperatorNode.js';

function SkillCards({name, skill_level, svg, description, onClick} : SkillTypes) {

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
        <div className='card_container relative w-[240px] h-[160px]'>
            <div 
                className='card_front flex flex-col items-center justify-center gap-[10px] px-[20px] py-[10px] border-[0.5px_solid_var(--border-light)] rounded-[10px] bg-[var(--foreground-rgb)] select-none'
                onClick={onClick ? onClick : () => {}}
            >
                    <div className='flex items-center gap-[5px]'>
                        {svg}
                        <span className='text-[var(--background-plain)] text-[20px] font-extrabold'>{name}</span>
                    </div>

                    {generateTag()}
            </div>

            <div className='card_back flex items-center justify-center px-[20px] py-[10px] bg-[var(--foreground-rgb)] rounded-[10px] select-none'>
                <p className='text-center text-[var(--border-light)] text-[14px] break-keep'>{description}</p>
            </div>
        </div>
    )
}

export default SkillCards