import '@assets/css/global.css';

import AuthInit from '@components/common/AuthInit';
import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';

import Coreprovider from '@providers/Coreprovider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Coreprovider>
          <AuthInit />
          <Header />
          <Sidebar />
          <main className="pt-16 md:pt-20">{children}</main>
        </Coreprovider>
      </body>
    </html>
  );
}
