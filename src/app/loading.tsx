import Image from 'next/image'
import React from 'react'

function Loading() {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='flex items-center justify-center w-[40px] h-[40px] border-[1px] border-solid border-[#000000] rounded-[5px] bg-[#ffffff] overflow-hidden'>
        <Image
          src="/gifs/spinner.gif"
          width={30}
          height={30}
          alt="spinner"
        />
      </div>
    </div>
  )
}

export default Loading