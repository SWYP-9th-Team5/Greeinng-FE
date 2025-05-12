import '@assets/css/global.css';

import AuthInit from '@components/common/AuthInit';
import Popup from '@components/common/Popup/Popup';
import Header from '@components/layout/Header';

import Coreprovider from '@providers/Coreprovider';

export default function RootLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Coreprovider>
          <AuthInit />
          <Header />
          {sidebar}
          <main className="pt-16 md:pt-20">{children}</main>
        </Coreprovider>
        <Popup />
      </body>
    </html>
  );
}
