import React from 'react';

import Image from 'next/image';

export const calFormatKoreanDate = (dateString?: string): string => {
  if (!dateString) return '1월 1일 월요일';
  const date = new Date(dateString);

  const month = date.getMonth() + 1; // 0부터 시작하므로 +1
  const day = date.getDate();

  const days = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  const dayOfWeek = days[date.getDay()];

  return `${month}월 ${day}일 ${dayOfWeek}`;
};

export default function DiaryModalHeader({
  date,
  handleClose,
}: {
  date: string;
  handleClose: () => void;
}) {
  const formatDate = calFormatKoreanDate(date);
  return (
    <div className="mb-[1.72rem] flex justify-between md:mb-[2rem]">
      <p className="title2 text-[#666]">{formatDate}</p>
      <button onClick={handleClose} aria-label="사이드바 닫기">
        <Image src="/icons/close.svg" alt="" width={24} height={24} />
      </button>
    </div>
  );
}
