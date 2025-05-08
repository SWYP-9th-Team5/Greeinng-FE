import api from '@/apis/api-config';
import { useAuthStore } from '@/stores/useAuthStore';

export const kakaoLoginButton = async () => {
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const REDIRECT_URI = 'http://localhost:3000/login/kakao';

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = kakaoAuthUrl;
};

export const kakaoLogin = async () => {
  try {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (!code) {
      alert('카카오 인가 코드가 없습니다.');
      return;
    }

    const res = await api.post<{
      data: { accessToken: string; newJoin: boolean };
    }>('/api/login/kakao', { code });

    const { accessToken, newJoin } = res.data;

    localStorage.setItem('token', accessToken);
    useAuthStore.getState().login(accessToken);

    window.location.href = '/'; //로그인 성공시 메인화면으로 분기
  } catch (err) {
    console.error('[kakaoLogin] 에러 발생:', err);
    alert('로그인에 실패했습니다.');
  }
};
