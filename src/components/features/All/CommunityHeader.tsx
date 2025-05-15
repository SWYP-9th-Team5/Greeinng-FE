'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import { usePopupStore } from '@/stores/usePopupStore';
import { useRouter } from 'next/navigation';

import Button from '@components/common/Button';

export const CommunityHeader = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { openPopup } = usePopupStore();

  const handleWrite = () => {
    if (isLoggedIn) {
      router.push('/story');
    } else {
      openPopup({
        title: '로그인이 필요한 서비스입니다',
        description: '로그인 후 그리닝의 서비스를 이용해 보세요.',
        confirmText: '로그인하기',
        cancelText: '닫기',
        mode: 'double',
        onConfirm: () => router.push('/login'),
        onCancel: () => {},
      });
    }
  };

  return (
    <div className="flex flex-row items-center justify-between pb-5">
      <p className="title1 text-primary">COMMUNITY</p>
      <Button
        size="sm"
        color="secondary"
        className="w-14 md:w-24"
        onClick={handleWrite}
      >
        글쓰기
      </Button>
    </div>
  );
};
