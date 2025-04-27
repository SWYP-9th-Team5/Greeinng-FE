import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center px-5 md:h-[calc(100vh-80px)]">
      {children}
    </section>
  );
}
