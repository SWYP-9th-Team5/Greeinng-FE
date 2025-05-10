'use client';

import React from 'react';
import { useState } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BaseModal from '@components/modal/BaseModal';

export default function SidebarHeader() {
  const { actionSidebarClose } = useSidebarStore();
  const { isLoggedIn, logout } = useAuthStore();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    console.log('로그아웃');
    logout();
    localStorage.removeItem('token');
    setShowLogoutModal(false);
    actionSidebarClose();
    router.push('/');
  };

  return (
    <>
      {isLoggedIn ? (
        <div className={cn('mb-[2rem] flex items-center justify-between')}>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="font-NanumSquareRoundB flex items-center tracking-[-0.02rem] text-[#666]"
            aria-label="로그아웃 버튼"
          >
            <Image src="/icons/person.svg" alt="" width={18} height={18} />
            로그아웃
          </button>
          <button onClick={actionSidebarClose} aria-label="사이드바 닫기">
            <Image src="/icons/close.svg" alt="" width={24} height={24} />
          </button>
        </div>
      ) : (
        <div className={cn('mb-[2rem] flex items-center justify-between')}>
          <Link
            className="font-NanumSquareRoundB flex items-center tracking-[-0.02rem] text-[#666]"
            href="/login"
            aria-label="로그인 링크"
            onClick={actionSidebarClose}
          >
            <Image src="/icons/person.svg" alt="" width={18} height={18} />
            로그인
          </Link>
          <button onClick={actionSidebarClose} aria-label="사이드바 닫기">
            <Image src="/icons/close.svg" alt="" width={24} height={24} />
          </button>
        </div>
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
