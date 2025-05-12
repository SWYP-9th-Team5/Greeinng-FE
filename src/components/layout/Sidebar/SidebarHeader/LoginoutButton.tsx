'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LoginoutButtonProps {
  type: 'login' | 'logout';
  onClick: () => void;
}

export default function LoginoutButton({ type, onClick }: LoginoutButtonProps) {
  const commonClass =
    'font-NanumSquareRoundB flex items-center tracking-[-0.02rem] text-[#666]';
  const commonIcon = (
    <Image src="/icons/person.svg" alt="" width={18} height={18} />
  );
  const label = type === 'login' ? '로그인' : '로그아웃';

  return type === 'login' ? (
    <Link
      href="/login"
      onClick={onClick}
      className={commonClass}
      aria-label="로그인 버튼"
    >
      {commonIcon}
      {label}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={commonClass}
      aria-label="로그아웃 버튼"
    >
      {commonIcon}
      {label}
    </button>
  );
}
