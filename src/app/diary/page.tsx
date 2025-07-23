'use client';

import React from 'react';

import { useAuthStore } from '@/stores/useAuthStore';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import Button from '@components/common/Button';

const mobileContent = `나의 소중한 식물들이 어떻게 자라고 있을지,\n어떻게 관리하고 있었는지\n하루하루 기록하고 확인 해보세요`;
const pcContent = `나의 소중한 식물들이 어떻게 자라고 있을지, 어떻게 관리하고 있었는지\n하루하루 기록하고 확인 해보세요`;

export default function DiaryStartPage() {
  const isLogin = useAuthStore((state) => state.isLoggedIn);

  const handleLogin = () => {
    if (!isLogin) redirect('/login');
  };

  if (isLogin) redirect('/diary/enroll');
  return (
    <section
      className={cn(
        'mx-auto mt-[3.75rem] flex h-screen w-[21.875rem] flex-col items-center overflow-hidden',
        'md:mt-0 md:h-full md:min-h-[calc(100vh-80px)] md:w-full md:flex-row md:justify-between md:gap-[3.74rem] md:pl-[7.51rem]',
      )}
    >
      <div className="mb-[1.25rem] flex w-full flex-col text-center md:w-[36.8rem] md:text-left">
        <h1 className="title1 mb-[1.5rem] text-[#333] md:mb-[2rem]">
          나만의 식물 성장 일기
        </h1>
        <p className="body1 mb-[5.38rem] hidden whitespace-pre-line md:block">
          {pcContent}
        </p>
        <p className="body1 mb-[1.25rem] whitespace-pre-line md:hidden">
          {mobileContent}
        </p>
        <Button
          color="secondary"
          className="md:h-[3.375rem] md:w-[24.125rem]"
          onClick={handleLogin}
        >
          로그인하고 시작하기
        </Button>
      </div>
      <div className="relative w-full flex-grow overflow-hidden md:hidden">
        <Image
          src="/images/diary/play-diary-start-mb.png"
          alt="나만의 식물 성장 일기"
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="relative hidden aspect-[815/716] w-[815px] md:block">
        <Image
          src="/images/diary/play-diary-start-pc.png"
          alt="나만의 식물 성장 일기"
          fill
          className="object-cover object-left"
        />
      </div>
    </section>
  );
}
