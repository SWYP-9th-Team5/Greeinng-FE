'use client';

import { useEffect } from 'react';

import { kakaoLogin } from '../kakaologin';

export default function KakaoCallbackPage() {
  useEffect(() => {
    kakaoLogin();
  }, []);

  return <p>로그인 처리 중입니다...</p>;
}
