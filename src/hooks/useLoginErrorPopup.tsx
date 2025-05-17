// hooks/useLoginErrorPopup.ts
import { usePopupStore } from '@/stores/usePopupStore';
import { useRouter } from 'next/navigation';

export const useLoginErrorPopup = () => {
  const openPopup = usePopupStore((state) => state.openPopup);
  const router = useRouter();

  const handleLoginPopup = () => {
    openPopup({
      title: '로그인이 필요한 서비스입니다',
      description: '로그인 후 그리닝의 서비스를 이용해 보세요.',
      confirmText: '로그인하기',
      cancelText: '닫기',
      mode: 'double',
      onConfirm: () => router.push('/login'),
      onCancel: () => {},
    });
  };

  return { handleLoginPopup };
};
