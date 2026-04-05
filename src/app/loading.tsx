import Image from 'next/image';

function Loading() {
  
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen gap-[25px]'>
      <div className='flex items-center justify-center w-[40px] h-[40px] p-[5px] border-[1px] border-solid border-[#000000] rounded-[5px] bg-[#ffffff] overflow-hidden'>
        <Image
          src="/gifs/spinner.gif"
          width={30}
          height={30}
          alt="spinner"
        />
      </div>
      <p className='text-center font-thin'>조금 시간이 걸릴 수 있어요<br/>잠시만 기다려 주세요...</p>
    </div>
  )
}

export default Loading