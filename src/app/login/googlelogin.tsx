import api from '@/apis/api-config';
import { useAuthStore } from '@/stores/useAuthStore';
import { usePopupStore } from '@/stores/usePopupStore';

export const googleLoginButton = async () => {
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = 'https://greening.vercel.app/login/google';
  const SCOPE = 'email profile';

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;

  window.location.href = googleAuthUrl;
};

export const googleLogin = async () => {
  const { openPopup } = usePopupStore.getState();

  try {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (!code) {
      alert('구글 인가 코드가 없습니다.');
      return;
    }

    const res = await api.post<{
      data: { accessToken: string; newJoin: boolean };
    }>('/api/login/google', { code });

    const { accessToken } = res.data;

    localStorage.setItem('token', accessToken);
    useAuthStore.getState().login(accessToken);

    window.location.href = '/'; // 로그인 성공 시 메인으로 이동
  } catch (err) {
    console.error('[googleLogin] 에러 발생:', err);
    openPopup({
      title: '로그인에 실패했습니다.',
      description: '다시 로그인 해주세요.',
      confirmText: '확인',
      mode: 'single',
      onConfirm: () => (window.location.href = '/login'),
    });
  }
};
