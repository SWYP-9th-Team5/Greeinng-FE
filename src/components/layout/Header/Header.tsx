'use client';

import { useMediaQuery } from 'react-responsive';

import BackIcon from '@assets/icons/arrow_left.svg';
import MenuIcon from '@assets/icons/menu.svg';
import MainLogo from '@assets/images/logo@2x.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { MEDIA_QUERY_MOBILE } from '@constants/mediaQuery';

import HeaderTab from './HeaderTab';
import LoginLink from './LoginLink';
import LogoLink from './LogoLink';

const tabList = [
  { href: '/community', name: '커뮤니티' },
  { href: '/mbti', name: '식물 MBTI' },
];

const PcHeader = () => {
  const indexLink = '/community';
  const loginLink = '/login';
  const loginText = '로그인';

  return (
    <header className="nowrap flex h-[80px] items-center justify-between px-[120px] py-[22px]">
      <div className="flex items-center gap-[47.09px]">
        <LogoLink href={indexLink} width={158} height={36} src={MainLogo} />
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
    <header className="flex h-[64px] justify-between px-[20px] py-[16px]">
      <button onClick={handleBack}>
        <Image src={BackIcon} alt="뒤로가기" width={24} height={24} />
      </button>
      <LogoLink href={indexLink} width={140} height={32} src={MainLogo} />
      <button onClick={() => {}}>
        <Image src={MenuIcon} alt="메뉴" width={24} height={24} />
      </button>
    </header>
  );
};

export default function Header() {
  const isMobile = useMediaQuery({ query: MEDIA_QUERY_MOBILE });
  return (
    <>
      {!isMobile && <PcHeader />}
      {isMobile && <MobileHeader />}
    </>
  );
}
