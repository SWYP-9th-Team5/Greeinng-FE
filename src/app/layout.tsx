import '@assets/css/global.css';

import Coreprovider from '@providers/Coreprovider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Coreprovider>{children}</Coreprovider>
      </body>
    </html>
  );
}
