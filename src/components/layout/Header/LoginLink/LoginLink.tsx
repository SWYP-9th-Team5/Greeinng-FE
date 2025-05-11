'use client';

import { useState } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BaseModal from '@components/modal/BaseModal';

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
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    console.log('로그아웃');
    logout();
    localStorage.removeItem('token');
    setShowLogoutModal(false);
    router.push('/');
  };

  return (
    <>
      {isLoggedIn ? (
        <button
          onClick={() => setShowLogoutModal(true)}
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
          <Image
            src="/icons/person.svg"
            alt="로그인 버튼"
            width={24}
            height={24}
          />
          {logintext}
        </Link>
      )}
      {/*로그아웃 확인 모달 */}
      {showLogoutModal && (
        <BaseModal
          title="로그아웃 하시겠습니까?"
          confirmText="예"
          cancelText="아니오"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
          className="aspect-[320/143] md:aspect-[400/171]"
        />
      )}
    </>
  );
}
