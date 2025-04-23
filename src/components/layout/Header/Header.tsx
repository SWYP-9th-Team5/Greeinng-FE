'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import HeaderTab from './HeaderTab';
import LoginLink from './LoginLink';
import LogoLink from './LogoLink';

const tabList = [
  { href: '/community', name: '커뮤니티' },
  { href: '/mbti', name: '식물 MBTI' },
];

const PcHeader = () => {
  const indexLink = '/';
  const loginLink = '/login';
  const loginText = '로그인';

  return (
    <header className="nowrap fixed top-0 flex h-[80px] w-full items-center justify-between px-[120px] py-[22px]">
      <div className="flex items-center gap-[47.09px]">
        <LogoLink
          href={indexLink}
          width={158}
          height={36}
          src={'/images/logo@2x.png'}
        />
        <HeaderTab tabList={tabList} />
      </div>
      <LoginLink href={loginLink} text={loginText} />
    </header>
  );
};

const MobileHeader = () => {
  const indexLink = '/community';
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="bg-background fixed top-0 z-100 flex h-[64px] w-full justify-between px-[20px] py-[16px]">
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
      <button>
        <Image src="/icons/menu.svg" alt="메뉴 버튼" width={24} height={24} />
      </button>
    </header>
  );
};

export default function Header() {
  return (
    <>
      <div className="block md:hidden">
        <MobileHeader />
      </div>
      <div className="hidden md:block">
        <PcHeader />
      </div>
    </>
  );
}
