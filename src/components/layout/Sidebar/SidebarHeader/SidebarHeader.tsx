import React from 'react';

import { useSidebarStore } from '@/stores/useSidebarStore';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';

export default function SidebarHeader() {
  const { actionSidebarClose } = useSidebarStore();

  return (
    <div className={cn('mb-[2rem] flex items-center justify-between')}>
      <Link
        className="font-NanumSquareRoundB flex items-center tracking-[-0.02rem] text-[#666]"
        href="/login"
        aria-label="로그인 링크"
        onClick={actionSidebarClose}
      >
        <Image src="/icons/person.svg" alt="" width={18} height={18} />
        로그인
      </Link>
      <button onClick={actionSidebarClose} aria-label="사이드바 닫기">
        <Image src="/icons/close.svg" alt="" width={24} height={24} />
      </button>
    </div>
  );
}
