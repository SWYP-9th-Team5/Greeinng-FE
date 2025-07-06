import React from 'react';

import Image from 'next/image';

export default function DiaryModalHeader() {
  return (
    <div className="mb-[1.72rem] flex justify-between md:mb-[2rem]">
      <p className="title2 text-[#666]">6월 13일 금요일</p>
      <button onClick={() => {}} aria-label="사이드바 닫기">
        <Image src="/icons/close.svg" alt="" width={24} height={24} />
      </button>
    </div>
  );
}
