import '@assets/css/global.css';

import Header from '@components/layout/Header';

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
          <main className="pt-16 md:pt-20">{children}</main>
        </Coreprovider>
      </body>
    </html>
  );
}
