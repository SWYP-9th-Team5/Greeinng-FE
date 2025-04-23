import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto mt-[6.25rem] flex w-full flex-col items-center px-[20px]">
      {children}
    </section>
  );
}
