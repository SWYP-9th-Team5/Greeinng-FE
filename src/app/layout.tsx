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
        <Header />
        <Coreprovider>{children}</Coreprovider>
      </body>
    </html>
  );
}
