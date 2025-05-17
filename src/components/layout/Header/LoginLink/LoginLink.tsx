'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import { usePopupStore } from '@/stores/usePopupStore';
import { useHandleLogout } from '@/utils/handleLogout';
import Image from 'next/image';
import Link from 'next/link';

interface LoginButtonProps {
  href: string;
  logintext: string;
  logouttext: string;
}

export default function LoginLink({
  href,
  logintext,
  logouttext,
}: LoginButtonProps) {
  const { isLoggedIn } = useAuthStore();
  const handleLogout = useHandleLogout();
  const { openPopup } = usePopupStore();

  const Logoutpopup = () => {
    openPopup({
      title: '로그아웃 하시겠습니까?',
      confirmText: '예',
      cancelText: '아니오',
      mode: 'double',
      onConfirm: () => {
        handleLogout();
      },
      onCancel: () => {},
    });
  };

  return isLoggedIn ? (
    <button
      onClick={Logoutpopup}
      className="font-NanumSquareRoundB flex items-center gap-[0.25rem] text-[1.125rem] whitespace-nowrap text-[#666]"
    >
      <Image
        src="/icons/person.svg"
        alt="로그아웃 버튼"
        width={24}
        height={24}
      />
      {logouttext}
    </button>
  ) : (
    <Link
      href={href}
      className="font-NanumSquareRoundB flex items-center gap-[0.25rem] text-[1.125rem] whitespace-nowrap text-[#666]"
    >
      <Image src="/icons/person.svg" alt="로그인 버튼" width={24} height={24} />
      {logintext}
    </Link>
  );
}
