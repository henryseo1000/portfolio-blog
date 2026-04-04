import SelectOptionProps from "@/types/selectTypes";
import { Dispatch, SetStateAction } from "react";

interface SkillSelectProps {
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  optionList: SelectOptionProps[],
  onSelect?: () => void
}

function SkillSelect({ value, setValue, optionList, onSelect } : SkillSelectProps) {
  return (
    <select
      className="h-[40px] px-[30px] text-[16px] font-extrabold text-[var(--foreground-rgb)] border-[1px] border-solid border-[var(--foreground-rgb)] rounded-[10px] bg-transparent bg-[95%_50%] bg-no-repeat bg-[url('/svg/selectArrow.svg')] outline-none appearance-none focus:outline-none"
      value={value} 
      onChange={(e) => {setValue(e.target.value)}}
      onSelect={onSelect}
    >
      {
        optionList.map((item, index) => {
          return (
            <option value={item.value} key={index}>{item.label}</option>
          )
        })
      }
    </select>
  )
}

export default SkillSelect;