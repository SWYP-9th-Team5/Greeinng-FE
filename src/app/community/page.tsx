'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import { usePopupStore } from '@/stores/usePopupStore';
import { useRouter } from 'next/navigation';

import Button from '@components/common/Button';
import TabComponent from '@components/features/community/Tabbarcomponent';

export default function CommunityPage() {
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
    <div className="flex flex-col px-5 pt-20 xl:px-32 xl:pt-12">
      <div className="flex flex-row items-center justify-between pb-5">
        <p className="title1 text-primary">COMMUNITY</p>
        <Button
          size="sm"
          color="secondary"
          className="hidden md:block md:w-24"
          onClick={handleWrite}
        >
          글쓰기
        </Button>
      </div>
      <TabComponent />
    </div>
  );
}
