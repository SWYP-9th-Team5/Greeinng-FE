'use client';

import React, { useState } from 'react';

import { usePopupStore } from '@/stores/usePopupStore';
import { cn } from '@/utils/cn';
import { QueryClient } from '@tanstack/react-query';
import Image from 'next/image';

import PostContent from '@components/features/community/detail/PostContent';

import { PostContentItem } from '@apis/data/community';
import useDiaryMutation from '@apis/mutations/diary/useDiaryMutation';
import diaryKeys from '@apis/queryKeys/diaryKeys';

import useOutsideClick from '@hooks/useOutsideClick';

import { TabValue } from './PostModal';

interface DiaryPostContentProps {
  value: TabValue;
  title?: string;
  content?: PostContentItem[];
  dailyRecordId: number;
}

export default function DiaryPostContent({
  value,
  title,
  content,
  dailyRecordId,
}: DiaryPostContentProps) {
  const { ref } = useOutsideClick<HTMLDivElement>(() => setOpen(false));

  const [isOpen, setOpen] = useState(false);
  const handleMenuToggle = () => setOpen((prev) => !prev);

  const openPopup = usePopupStore((state) => state.openPopup);
  const { deletePetPlantDiaryMutation } = useDiaryMutation();

  const queryClient = new QueryClient();
  const handleDeletePopup = () => {
    handleMenuToggle();
    openPopup({
      title: '삭제하시겠습니까?',
      description: '삭제된 글은 복구할 수 없습니다',
      confirmText: '예',
      cancelText: '아니요',
      mode: 'double',
      onConfirm: () => {
        deletePetPlantDiaryMutation.mutate(
          {
            dailyRecordId,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: diaryKeys.getPetPlantsTodayInfo(dailyRecordId),
              });
            },
            onError: () => {},
          },
        );
      },
      onCancel: () => {},
    });
  };

  return (
    <div
      className={cn(
        'h-full flex-col overflow-y-auto pr-[1.25rem] text-wrap break-words md:flex',
        value === 'post' && title ? 'flex' : 'hidden',
      )}
    >
      <div className="mb-[1.06rem] flex justify-between">
        <h2 className="subTitle">{title}</h2>
        <div ref={ref} className="relative">
          <button
            className={cn('h-fit w-fit text-gray-500 hover:text-gray-700')}
            aria-label="게시물 설정 메뉴"
            aria-expanded={isOpen}
            onClick={handleMenuToggle}
          >
            <Image src="/icons/row_menu.svg" alt="" width={24} height={24} />
          </button>
          {isOpen && (
            <div
              role="menu"
              className="absolute right-0 flex w-[4.0625rem] flex-col gap-[0.75rem] rounded-[0.3125rem] bg-[#fff] py-[0.5rem] pl-[0.75rem] shadow-sm md:w-[6.25rem] md:px-[1.13rem] md:py-[0.75rem]"
            >
              <button
                className="body1 w-full text-left text-nowrap"
                onClick={handleDeletePopup}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
      <PostContent content={content ?? []} />
    </div>
  );
}
