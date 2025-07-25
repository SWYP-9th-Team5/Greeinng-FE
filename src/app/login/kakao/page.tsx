'use client';

import { useEffect } from 'react';

import animationData from '@assets/lottie/login_loading_pc.json';
import dynamic from 'next/dynamic';

import { kakaoLogin } from '../kakaologin';

export default function KakaoCallbackPage() {
  const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

  useEffect(() => {
    kakaoLogin();
  }, []);

  return (
    <div className="-mt-16 flex min-h-screen w-full items-center justify-center bg-[#d9d9d9] md:-mt-20">
      <div className="h-[80px] w-[80px] md:h-[120px] md:w-[120px]">
        <Lottie animationData={animationData} loop autoplay />
      </div>
    </div>
  );
}
