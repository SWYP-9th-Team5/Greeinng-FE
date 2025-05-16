import React, { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export default function Layout({ children }: { children: ReactNode }) {
  const articleClssName = cn(
    'm-auto flex flex-col items-center',
    // 작은 모바일
    'max-xxs:w-full',
    // 모바일
    'px-5 py-10 max-md:px-5',
    // PC
    'md:w-[45rem] md:pt-[4.375rem] md:pb-[3.25rem]',
  );

  return <article className={articleClssName}>{children}</article>;
}
