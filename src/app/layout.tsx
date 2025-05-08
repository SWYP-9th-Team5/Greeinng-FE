'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';
import '@assets/css/global.css';

import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';

import Coreprovider from '@providers/Coreprovider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) login(token);
  }, [login]);

  return (
    <html lang="en">
      <body>
        <Coreprovider>
          <Header />
          <Sidebar />
          <main className="pt-16 md:pt-20">{children}</main>
        </Coreprovider>
      </body>
    </html>
  );
}
