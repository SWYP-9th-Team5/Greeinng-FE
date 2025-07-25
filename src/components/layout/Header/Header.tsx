'use client';

import React from 'react';

import { useSidebarStore } from '@/stores/useSidebarStore';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import HeaderTab from './HeaderTab';
import LoginLink from './LoginLink';
import LogoLink from './LogoLink';

const tabList = [
  { href: '/community', name: '커뮤니티' },
  { href: '/diary', name: '성장 일기' },
  { href: '/mbti', name: '식물 MBTI' },
  { href: '/mypage', name: '마이페이지' },
];

const PcHeader = () => {
  const indexLink = '/';
  const loginLink = '/login';
  const loginText = '로그인';
  const logoutText = '로그아웃';

  return (
    <>
      <div className="flex items-center gap-[47.09px]">
        <LogoLink
          href={indexLink}
          width={158}
          height={36}
          src={'/images/logo@2x.png'}
        />
        <HeaderTab tabList={tabList} />
      </div>
      <LoginLink
        href={loginLink}
        logintext={loginText}
        logouttext={logoutText}
      />
    </>
  );
};

const MobileHeader = () => {
  const indexLink = '/';
  const router = useRouter();

  const actionSidebarOpen = useSidebarStore((state) => state.actionSidebarOpen);

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <button onClick={handleBack}>
        <Image
          src="/icons/arrow_left.svg"
          alt="뒤로가기 버튼"
          width={24}
          height={24}
        />
      </button>
      <LogoLink
        href={indexLink}
        width={140}
        height={32}
        src={'/images/logo@2x.png'}
      />
      <button onClick={actionSidebarOpen}>
        <Image src="/icons/menu.svg" alt="메뉴 버튼" width={24} height={24} />
      </button>
    </>
  );
};

export default function Header() {
  const pathname = usePathname();

  const hiddenRoutes = ['/login/google', '/login/kakao'];
  const isHidden = hiddenRoutes.includes(pathname);

  if (isHidden) return null;
  return (
    <>
      {/* 모바일 */}
      <header
        className={cn(
          'flex lg:hidden',
          'bg-background fixed top-0 z-100 flex h-[64px] w-full items-center justify-between px-[20px] py-[16px]',
        )}
      >
        <MobileHeader />
      </header>
      {/* PC */}
      <header
        className={cn(
          'hidden lg:flex',
          'bg-background nowrap fixed top-0 h-[80px] w-full items-center justify-between px-[120px] py-[22px]',
        )}
      >
        <PcHeader />
      </header>
    </>
  );
}
