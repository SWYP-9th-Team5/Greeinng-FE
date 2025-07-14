'use client';

import React from 'react';
import { useState } from 'react';

import Image from 'next/image';

import Button from '@components/common/Button';

interface PlantRegisterCardProps {
  onClose: () => void;
  onSubmit: (name: string, type: string) => void;
  defaultDate?: string;
}

export function PlantCard({ onClose, onSubmit }: PlantRegisterCardProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const getToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  };

  const defaultDate = getToday();

  const handleSubmit = async () => {
    if (!name || !type) return alert('모든 항목을 입력해 주세요.');

    try {
      await onSubmit(name, type); // ✅ 서버로 전송 완료까지 기다림
      console.log('✅ 식물 등록 성공'); // 여기서도 로그 찍기 가능
      setName('');
      setType('');
      // onClose(); // 등록 후 자동 닫기 원하면 이 줄 활성화
    } catch (err) {
      console.error('❌ 등록 실패:', err);
      alert('등록 중 오류가 발생했습니다.');
    }
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
        onClick={handleSubmit}
        color="secondary"
        size="sm"
        className="absolute right-4 bottom-2 w-[3.75rem] md:w-[6.25rem]"
      >
        등록
      </Button>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 h-5 w-5 bg-[url('/icons/xmark.svg')] bg-contain bg-center bg-no-repeat md:h-6 md:w-6"
        aria-label="닫기"
      ></button>
    </div>
  );
}
