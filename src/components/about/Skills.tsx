import { Monitor } from "lucide-react"

function Skills() {
  return (
    <div className='card3 flex flex-col justify-center absolute top-[50%] left-[50%] w-[50%] aspect-[7/4] p-[50px] gap-[30px] border-[1px] rounded-[10px] bg-[var(--foreground-rgb)] duration-200 shadow-lg translate-x-[-50%] translate-y-[-50%] rotate-[1deg] select-none'>
        <div className="flex items-center gap-[10px] text-[var(--background-basic)] text-[25px] font-bold">
          <Monitor/>
          <p>SKILLS</p>
        </div>
    </div>
  )
}

export default Skills