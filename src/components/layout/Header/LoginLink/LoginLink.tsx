'use client';

import { useAuthStore } from '@/stores/useAuthStore';
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
  const { isLoggedIn, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return isLoggedIn ? (
    <button
      onClick={handleLogout}
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
