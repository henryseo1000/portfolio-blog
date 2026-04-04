import React from 'react'

function Footer() {
  return (
    <div className='flex flex-col justify-center w-screen h-[300px] px-[40px] py-[30px] gap-[10px] bg-[#161616]'>
        <div/>

        <div className='w-full h-[1px] bg-[var(--background-light)]'/>

        <div className='flex flex-col items-center justify-center w-full text-[14px] text-[var(--background-light)]'>
          <p >Copyright @ 2026 by henryseo1000. All rights reserved.</p>
          <p>Created by @서호준,  Powered by @서호준</p>
        </div>
    </div>
  )
}

export default Footer;