'use client';

import handleDownload from "@/utils/download";

export default function About() {
  return (
    <div>
      <button
        onClick={() => {
          handleDownload("/files/정보처리산업기사_자격증.pdf", "서호준_자격증.pdf")
        }}
      >
        자격증 테스트
      </button>
    </div>
  )
}