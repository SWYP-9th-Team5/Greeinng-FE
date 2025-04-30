import '@assets/css/global.css';

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
          <Header />
          <Sidebar />
          <main className="pt-16 md:pt-20">{children}</main>
        </Coreprovider>
      </body>
    </html>
  );
}
