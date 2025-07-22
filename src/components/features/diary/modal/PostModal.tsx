'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

import { useDiaryModalStore } from '@/stores/useDiaryModalStore';
import { usePopupStore } from '@/stores/usePopupStore';
import { useQuery } from '@tanstack/react-query';

import { getPetPlantsTodayInfo } from '@apis/data/diary';
import useDiaryMutation from '@apis/mutations/diary/useDiaryMutation';
import diaryKeys from '@apis/queryKeys/diaryKeys';

import PostModalContent from './PostModalContent';

export type TabValue = 'stamp' | 'post' | 'modify' | 'content';

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

export type DiaryModalState = {
  isWatering: boolean;
  petPlantId: number;
  dailyRecordId: number;
  date: string;
};

export default function PostModal() {
  const modalState = useDiaryModalStore((state) => state.diaryState);
  const handleModalState = useDiaryModalStore(
    (state) => state.handleSetDiaryState,
  );
  const { dailyRecordId, date, petPlantId } = modalState;
  const [tab, setTab] = useState<TabValue>('stamp');

  const { data, refetch } = useQuery({
    queryKey: diaryKeys.getPetPlantsTodayInfo(dailyRecordId),
    queryFn: () => getPetPlantsTodayInfo(dailyRecordId),
    enabled: dailyRecordId !== -1,
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5,
  });

  const handlePost = (value: TabValue) => {
    setTab(value);
  };

  const { postWaterMutation } = useDiaryMutation();
  const openPopup = usePopupStore((state) => state.openPopup);
  const handleWater = (isWater: boolean) => {
    if (isWater) return;

    if (date)
      openPopup({
        title: '오늘 물을 주셨나요?',
        description: '',
        confirmText: '예',
        cancelText: '아니요',
        mode: 'double',
        onConfirm: () => {
          postWaterMutation.mutate(
            {
              petPlantId: petPlantId,
              today: date,
            },
            {
              onSuccess: () => {
                handleModalState({
                  ...modalState,
                  isWatering: true,
                });
              },
              onError: (res) => {
                toast.error(res?.response?.data.message);
              },
            },
          );
        },
        onCancel: () => {},
      });
  };

  return (
    <section className="fixed inset-0 z-[1000] mx-auto p-[1rem]">
      <PostModalContent
        value={tab}
        date={date}
        content={data?.content}
        title={data?.title}
        petPlantId={petPlantId}
        dailyRecordId={dailyRecordId}
        handlePost={handlePost}
        handleWater={handleWater}
        refetch={refetch}
      />
    </section>
  );
}
