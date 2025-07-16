'use client';

import { useState } from 'react';

import { usePopupStore } from '@/stores/usePopupStore';
import { useQuery } from '@tanstack/react-query';

import { getPetPlantsTodayInfo } from '@apis/data/diary';
import useDiaryMutation from '@apis/mutations/diary/useDiaryMutation';
import diaryKeys from '@apis/queryKeys/diaryKeys';

import PostModalContent from './PostModalContent';

export type TabValue = 'stamp' | 'post';

export const calFormatKoreanDate = (dateString: string): string => {
  const date = new Date(dateString);

  const month = date.getMonth() + 1; // 0부터 시작하므로 +1
  const day = date.getDate();

  const days = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  const dayOfWeek = days[date.getDay()];

  return `${month}월 ${day}일 ${dayOfWeek}`;
};

export default function PostModal() {
  const [tab, setTab] = useState<TabValue>('stamp');
  const [isWater, setIsWater] = useState(false);

  const { data } = useQuery({
    queryKey: diaryKeys.getPetPlantsTodayInfo(3, 3),
    queryFn: () => getPetPlantsTodayInfo(3, 3),
  });

  const handlePost = (value: TabValue, title?: string) => {
    console.log(title);
    setTab(value === 'stamp' ? 'post' : 'stamp');
  };

  const { postWaterMutation } = useDiaryMutation();
  const openPopup = usePopupStore((state) => state.openPopup);
  const handleWater = (isWater: boolean) => {
    if (isWater) return;
    openPopup({
      title: '오늘 물을 주셨나요?',
      description: '',
      confirmText: '예',
      cancelText: '아니요',
      mode: 'double',
      onConfirm: () => {
        postWaterMutation.mutate(
          {
            userId: 3,
            petPlantId: 14,
            today: '2025-07-16',
          },
          {
            onSuccess: () => {
              setIsWater(true);
            },
            onError: () => {},
          },
        );
      },
      onCancel: () => {},
    });
  };

  return (
    <section className="absolute inset-0 z-900 mx-auto p-[1rem]">
      <PostModalContent
        value={tab}
        isWater={isWater}
        date={data?.createdAt}
        content={data?.content}
        title={data?.title}
        handlePost={handlePost}
        handleWater={handleWater}
      />
    </section>
  );
}
