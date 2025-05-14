'use client';

import { useEffect } from 'react';

import { googleLogin } from '../googlelogin';

export default function GoogleCallbackPage() {
  useEffect(() => {
    googleLogin();
  }, []);

  return <p>구글 로그인 처리 중입니다...</p>;
}
