'use client';

import useOutsideClick from '@/stores/useOutsideClick';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { cn } from '@/utils/cn';

import SidebarHeader from './SidebarHeader';
import SidebarNav from './SidebarNav';

export default function Sidebar() {
  const { isSidebarOpen, actionSidebarClose } = useSidebarStore();
  const { ref } = useOutsideClick<HTMLDivElement>(actionSidebarClose);

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
      <h2 className="sr-only">사이드바</h2>
      <SidebarHeader />
      <SidebarNav />
    </section>
  );
}
