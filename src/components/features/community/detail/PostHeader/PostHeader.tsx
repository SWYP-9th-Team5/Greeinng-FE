import React from 'react';

import { CommunityCategory } from '@/types/community';
import { cn } from '@/utils/cn';
import Image from 'next/image';

export interface PostHeaderProps {
  category: CommunityCategory;
  title: string;
  userName: string;
  createdAt: string;
}

export default function PostHeader({
  category,
  title,
  userName,
  createdAt,
}: PostHeaderProps) {
  return (
    <header
      className={cn(
        'mb-8 flex w-full items-end justify-between gap-[3.1875rem] border-b-1 border-b-[#eee] pb-4',
        'md:mb-10 md:pb-[1.375rem]',
      )}
    >
      <div className={cn('flex flex-col')}>
        {/* type PC일 떄만 보임 */}
        <span className="md:text-tertiary font-NanumSquareRoundB hidden text-[1.125rem] leading-[1.222] md:block">
          {category}
        </span>
        <h1 className={cn('title2 mb-2', 'md:mb-6')}>{title}</h1>
        <p className={cn('body1 mb-1 text-[#666]')}>{userName}</p>
        {/* ! data time 관련해서 포맷 수정 필요 */}
        <time
          dateTime={createdAt}
          className={cn('body2 leading-[0.875rem] text-[#999]')}
        >
          {createdAt}
        </time>
      </div>
      <button
        className={cn('h-fit w-fit text-gray-500 hover:text-gray-700')}
        aria-label="게시물 설정 메뉴"
      >
        <Image src="/icons/row_menu.svg" alt="" width={24} height={24} />
      </button>
    </header>
  );
}
