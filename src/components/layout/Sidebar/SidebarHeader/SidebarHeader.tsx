'use client';

import React from 'react';

import { useAuthStore } from '@/stores/useAuthStore';
import { usePopupStore } from '@/stores/usePopupStore';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { cn } from '@/utils/cn';
import { useHandleLogout } from '@/utils/handleLogout';
import Image from 'next/image';

import LoginoutButton from './LoginoutButton';

export default function SidebarHeader() {
  const { actionSidebarClose } = useSidebarStore();
  const { isLoggedIn } = useAuthStore();
  const { openPopup } = usePopupStore();
  const handleLogout = useHandleLogout();

  const Logoutpopup = () => {
    openPopup({
      title: '로그아웃 하시겠습니까?',
      confirmText: '예',
      cancelText: '아니오',
      mode: 'double',
      className: 'aspect-[320/143] md:aspect-[400/171]',
      onConfirm: () => {
        handleLogout({ closeSidebar: true });
      },
      onCancel: () => {},
    });
  };

  return (
    <div className={cn('mb-[2rem] flex items-center justify-between')}>
      <LoginoutButton
        type={isLoggedIn ? 'logout' : 'login'}
        onClick={isLoggedIn ? Logoutpopup : actionSidebarClose}
      />
      <button onClick={actionSidebarClose} aria-label="사이드바 닫기">
        <Image src="/icons/close.svg" alt="" width={24} height={24} />
      </button>
    </div>
  );
}
