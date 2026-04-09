import React from 'react'

function PostCard({type, pageId, thumbnailPath, title, path}) {
  return (
    <a
        className='flex flex-col justify-center w-full h-[250px] text-[18px] font-semibold border-[0.5px] border-[#4C4C4C] bg-[#393939] rounded-[10px] duration-300 overflow-hidden hover:opacity-50'
        href={path}
    >
        <img
            className='flex h-[calc(100%_-_80px)] rounded-[0px] object-cover'
            src={thumbnailPath}
            alt='thumbnail'
        />

        <div className='flex flex-col justify-center h-[80px] px-[20px] py-[10px]'>
            <p className='whitespace-nowrap text-ellipsis overflow-hidden'>{title}</p>
            <p className='text-[12px] font-thin'>작성자 : 서호준</p>
        </div>
    </a>
  )
}

export default PostCard