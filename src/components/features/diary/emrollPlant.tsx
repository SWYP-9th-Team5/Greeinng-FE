'use client';

import React from 'react';
import { useState } from 'react';

import { usePopupStore } from '@/stores/usePopupStore';
import Image from 'next/image';

import Button from '@components/common/Button';

interface PlantRegisterCardProps {
  onClose: () => void;
  onSubmit: (name: string, type: string) => void;
  defaultDate?: string;
}

export function PlantEnrollCard({ onClose, onSubmit }: PlantRegisterCardProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const getToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  };
  const { openPopup } = usePopupStore.getState();

  const defaultDate = getToday();
  const handleSubmit = async () => {
    try {
      await onSubmit(name, type);
      setName('');
      setType('');
    } catch (err) {
      console.error('❌ 등록 실패:', err);
    }
  };

  const validateAndConfirm = () => {
    if (!name) {
      openPopup({
        title: '이름을 입력해 주세요.',
        description:
          '이름이 입력되지 않았습니다.\n이름 입력 후 등록 가능합니다.',
        confirmText: '확인',
        mode: 'single',
        onConfirm: () => {},
      });
      return;
    }

    if (!type) {
      openPopup({
        title: '종류를 입력해 주세요.',
        description:
          '식물의 종류가 입력되지 않았습니다.\n입력 후 등록 가능합니다.',
        confirmText: '확인',
        mode: 'single',
        onConfirm: () => {},
      });
      return;
    }
    openPopup({
      title: '등록 하시겠습니까?',
      description: '등록 후에는 수정이 어렵습니다.',
      confirmText: '예',
      cancelText: '아니오',
      mode: 'double',
      onConfirm: handleSubmit,
      onCancel: () => {},
    });
  };

  return (
    <div className="relative flex h-[102px] w-[318px] items-center justify-start rounded-[10px] bg-[#F5F4F0] pl-4 md:h-[148px] md:w-[500px] md:rounded-[20px] md:pl-6">
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
        <input
          type="text"
          placeholder="이름을 만들어 주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="body1 h-[26px] w-[150px] rounded-md border border-[#DDDDDD] bg-[#FFF] pl-2 placeholder-[#CCC] md:h-[30px] md:w-60"
        />
        <input
          type="text"
          placeholder="무슨 식물인가요?"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="body1 mt-1 h-[26px] w-[150px] rounded-md border border-[#DDDDDD] bg-[#FFF] pl-2 placeholder-[#CCC] md:mt-3 md:h-[30px] md:w-60"
        />
        <p className="body1 mt-1 text-[#666]">등록일 : {defaultDate}</p>
      </div>
      <Button
        onClick={validateAndConfirm}
        color="secondary"
        size="sm"
        className="absolute right-4 bottom-2 w-[3.75rem] md:w-[6.25rem]"
      >
        등록
      </Button>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 h-5 w-5 bg-[url('/icons/close.svg')] bg-contain bg-center bg-no-repeat md:h-6 md:w-6"
        aria-label="닫기"
      ></button>
    </div>
  );
}
