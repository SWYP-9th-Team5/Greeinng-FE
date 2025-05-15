import React from 'react';

import { cn } from '@/utils/cn';
import Image from 'next/image';

import { PostContentItem } from '@apis/data/community';

interface PostContentProps {
  content: PostContentItem[];
}

const contentMap: Record<
  string,
  (value: string, idx: number) => React.ReactNode
> = {
  TEXT: (value, idx) => (
    <p key={idx} className={cn('body1 w-full whitespace-pre-line text-[#666]')}>
      {value}
    </p>
  ),
  IMAGE: (value, idx) => (
    <Image
      key={idx}
      src={value}
      alt="image"
      width={720}
      height={720}
      className="my-6"
    />
  ),
};

// ! 포맷 보고 재수정 필요함
export default function PostContent({ content }: PostContentProps) {
  return (
    <section className="mb-10 md:mb-16">
      {content.map((item, idx) => contentMap[item.type](item.value, idx))}
    </section>
  );
}
