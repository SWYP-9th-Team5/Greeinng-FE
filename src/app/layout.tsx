import '@assets/css/global.css';

import AuthInit from '@components/common/AuthInit';
import Header from '@components/layout/Header';

import Coreprovider from '@providers/Coreprovider';

export const metadata = {
  title: 'Greening',
  description: '식물을 사랑하는 사람들의 공간, Greening 식물 커뮤니티!',
  openGraph: {
    title: 'Greening - 식물과 함께하는 일상',
    description:
      '식물을 좋아하는 사람들이 모이는 따뜻한 커뮤니티, Greening에서 함께해요!',
    url: 'https://greening.vercel.app',
    siteName: 'Greening',
    images: [
      {
        url: 'https://greening.vercel.app/images/main/main_1_pc.png',
        width: 1200,
        height: 630,
        alt: 'Greening 식물 커뮤니티 대표 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greening - 식물과 함께하는 일상',
    description:
      '식물을 좋아하는 사람들이 모이는 따뜻한 커뮤니티, Greening에서 함께해요!',
    images: ['https://greening.vercel.app/images/main/main_1_pc.png'],
  },
};

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
      </body>
    </html>
  );
}
