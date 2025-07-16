'use client';

import { Dispatch, SetStateAction, useState } from 'react';

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

export type DiaryModalState = {
  isOpen: boolean;
  isWatering: boolean;
  petPlantId: number;
  dailyRecordId: number;
  date: string;
};
interface PostModalProps {
  modalState: DiaryModalState;
  setModalState: Dispatch<SetStateAction<DiaryModalState>>;
}

export default function PostModal({
  modalState,
  setModalState,
}: PostModalProps) {
  const { isWatering, dailyRecordId, date, petPlantId } = modalState;

  const [tab, setTab] = useState<TabValue>('stamp');
  const [isWater, setIsWater] = useState(isWatering);

  const { data } = useQuery({
    queryKey: diaryKeys.getPetPlantsTodayInfo(dailyRecordId),
    queryFn: () => getPetPlantsTodayInfo(dailyRecordId),
  });

  const handleClose = () =>
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));

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
            petPlantId: 13,
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
    <section className="fixed inset-0 z-900 mx-auto p-[1rem]">
      <PostModalContent
        value={tab}
        isWater={isWater}
        date={date}
        content={data?.content}
        title={data?.title}
        petPlantId={petPlantId}
        dailyRecordId={dailyRecordId}
        handlePost={handlePost}
        handleWater={handleWater}
        handleClose={handleClose}
      />
    </section>
  );
}
