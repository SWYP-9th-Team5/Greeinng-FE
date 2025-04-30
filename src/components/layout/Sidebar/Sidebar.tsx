'use client';

import React from 'react';

import { useSidebarStore } from '@/stores/useSidebarStore';
import { cn } from '@/utils/cn';

import SidebarHeader from './SidebarHeader';
import SidebarNav from './SidebarNav';

export default function Sidebar() {
  const { isSidebarOpen } = useSidebarStore();

  return (
    <section
      className={cn(
        !isSidebarOpen && 'hidden',
        isSidebarOpen &&
          'fixed right-0 z-200 h-[100vh] w-[71%] bg-[#FEFEFE] px-[1rem] py-[1.1875rem] md:hidden',
      )}
      role="aside"
    >
      <h2 className="sr-only">사이드바</h2>
      <SidebarHeader />
      <SidebarNav />
    </section>
  );
}
