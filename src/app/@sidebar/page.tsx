'use client';

import React from 'react';

import { useSidebarStore } from '@/stores/useSidebarStore';
import { cn } from '@/utils/cn';

import FocusTrap from '@components/common/FocusTrap';
import SidebarHeader from '@components/layout/Sidebar/SidebarHeader';
import SidebarNav from '@components/layout/Sidebar/SidebarNav';

import useOutsideClick from '@hooks/useOutsideClick';

export default function Page() {
  const { isSidebarOpen, actionSidebarClose } = useSidebarStore();
  const { ref } = useOutsideClick(actionSidebarClose);

  return (
    <section
      ref={ref}
      className={cn(
        'fixed right-0 z-300 h-[100vh] w-[71%] bg-[#FEFEFE] px-[1rem] py-[1.1875rem] transition-transform duration-300 ease-in-out md:hidden',
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full',
      )}
      role="aside"
      aria-hidden={!isSidebarOpen}
      inert={!isSidebarOpen}
    >
      <FocusTrap
        isActive={isSidebarOpen}
        isAutoFocus={false}
        isRestoreFocus={true}
      >
        <h2 className="sr-only">사이드바</h2>
        <SidebarHeader />
        <SidebarNav />
      </FocusTrap>
    </section>
  );
}
