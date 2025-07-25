import api from '@/apis/api-config';
import { useAuthStore } from '@/stores/useAuthStore';
import { usePopupStore } from '@/stores/usePopupStore';

export const kakaoLoginButton = async () => {
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const REDIRECT_URI = `${window.location.origin}/login/kakao`;

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = kakaoAuthUrl;
};

export const kakaoLogin = async () => {
  const { openPopup } = usePopupStore.getState();

  try {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const REDIRECT_URI = `${window.location.origin}/login/kakao`;

    if (!code) {
      alert('카카오 인가 코드가 없습니다.');
      return;
    }

    const res = await api.post<{
      data: { accessToken: string; newJoin: boolean };
    }>('/api/login/kakao', { code, redirectURI: REDIRECT_URI });

    const { accessToken } = res.data;

    localStorage.setItem('token', accessToken);
    useAuthStore.getState().login(accessToken);

    window.location.href = '/'; //로그인 성공시 메인화면으로 분기
  } catch (err) {
    console.error('[kakaoLogin] 에러 발생:', err);
    openPopup({
      title: '로그인에 실패했습니다.',
      description: '다시 로그인 해주세요.',
      confirmText: '확인',
      mode: 'single',
      onConfirm: () => (window.location.href = '/login'),
    });
  }
};
