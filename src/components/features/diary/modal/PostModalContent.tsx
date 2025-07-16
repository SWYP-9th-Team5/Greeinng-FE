'use client';

import React, { Suspense } from 'react';

import { cn } from '@/utils/cn';
import Image from 'next/image';

import FocusTrap from '@components/common/FocusTrap';

import { PostContentItem } from '@apis/data/community';

import DiaryModalHeader from './DiaryModalHeader';
import DiaryModalPost from './DiaryModalPost';
import DiaryModalRecord from './DiaryModalRecord';
import DiaryPostContent from './DiaryPostContent';
import { TabValue } from './PostModal';

export interface PostModalProps {
  value: TabValue;
  title?: string;
  date?: string;
  content?: PostContentItem[];
  isWater: boolean;
  handlePost: (value: TabValue) => void;
  handleWater: (isWater: boolean) => void;
}

export default function PostModalContent({
  title,
  content,
  value,
  date,
  isWater,
  handlePost,
  handleWater,
}: PostModalProps) {
  return (
    <Suspense fallback={<></>}>
      <FocusTrap
        isAutoFocus={true}
        className={cn(
          'flex h-full max-w-full flex-col rounded-[1.25rem] bg-[#F5F4F0] p-[0.75rem] shadow-[0_0_30px_10px_rgba(102,102,102,0.25)] md:flex md:p-[2.25rem]',
        )}
      >
        <DiaryModalHeader date={date} />
        <div className="flex h-full flex-col overflow-hidden md:grid md:grid-cols-[15fr_auto_47fr]">
          <DiaryModalRecord
            title={title}
            value={value}
            isWater={isWater}
            handleWater={handleWater}
            handlePost={handlePost}
          />
          <div className="mx-[1.25rem] hidden w-[2px] bg-[#ccc] md:block" />
          {title && (
            <DiaryPostContent value={value} title={title} content={content} />
          )}
          {!title && value === 'stamp' && (
            <div className="subTitle hidden flex-col items-center justify-center gap-[1.5rem] md:flex">
              <Image
                src="/icons/note.svg"
                alt="오늘의 식물을 기록해 보세요"
                width={100}
                height={94}
              />
              <span>오늘의 식물을 기록해 보세요</span>
            </div>
          )}
          {!title && value === 'post' && <DiaryModalPost value={value} />}
        </div>
      </FocusTrap>
    </Suspense>
  );
}
