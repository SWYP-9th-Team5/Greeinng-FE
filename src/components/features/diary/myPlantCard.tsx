'use client';

import React from 'react';

import { usePopupStore } from '@/stores/usePopupStore';
import Image from 'next/image';

import { deletePlant } from '@apis/data/diary';

import CustomStyledCalendar from './customCalendar';

interface MyPlantCardProps {
  onClose: () => void;
  name: string;
  type: string;
  createdAt: string;
  id: number;
}

export function MyPlantCard({
  onClose,
  name,
  type,
  createdAt,
  id,
}: MyPlantCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  };
  const { openPopup } = usePopupStore.getState();

  const handleDelete = async () => {
    try {
      await deletePlant(id);
      onClose();
      location.reload();
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative mb-5 flex h-[102px] w-[318px] items-center justify-start rounded-[10px] bg-[#F5F4F0] pl-4 md:h-[148px] md:w-[500px] md:rounded-[20px] md:pl-6">
        <div className="mr-5 flex items-center justify-center md:mr-10">
          <Image
            src="/images/diary/enroll_plant.svg"
            alt="식물 아이콘"
            width={78}
            height={94}
            className="h-auto w-[50px] md:w-[80px]"
          />
        </div>
        <div className="flex flex-col">
          <p className="subTitle text-text2">{name}</p>
          <p className="body1 mt-[0.45rem] text-[#666] md:mt-3">{type}</p>
          <p className="body1 mt-[0.1rem] text-[#666] md:mt-1">
            등록일 : {formatDate(createdAt)}
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 h-5 w-5 bg-[url('/icons/close.svg')] bg-contain bg-center bg-no-repeat md:h-6 md:w-6"
          aria-label="닫기"
        ></button>
        <button
          onClick={() => {
            openPopup({
              title: '삭제 하시겠습니까?',
              description: '삭제된 식물은 복구할 수 없습니다.',
              confirmText: '예',
              cancelText: '아니오',
              mode: 'double',
              onConfirm: handleDelete,
              onCancel: () => {},
            });
          }}
          className="absolute right-3 bottom-3 h-5 w-5 bg-[url('/icons/garbageCan.svg')] bg-contain bg-center bg-no-repeat md:h-6 md:w-6"
          aria-label="삭제"
        ></button>
      </div>
      <CustomStyledCalendar />
    </div>
  );
}
