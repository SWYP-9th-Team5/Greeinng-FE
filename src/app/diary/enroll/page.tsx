'use client';

import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

import { redirect } from 'next/navigation';

import Button from '@components/common/Button';
import { PlantCard } from '@components/features/diary/emrollPlant';

import { createPlantCard } from '@apis/data/diary';

const PCHome = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-20">
      <div className="title1 text-text2 mt-14 mb-4 w-[1200px] text-start">
        식집사님의 기록
      </div>
      <div className="flex h-[716px] w-[1200px] flex-col items-center justify-center bg-[url('/images/diary/enroll_note_pc.svg')] bg-contain bg-center bg-no-repeat pr-[580px]">
        <p className="subTitle text-text2 mb-5 text-center">
          아직 등록된 식물이 없어요
        </p>
        <p className="body1 mb-14 text-center text-[#666]">
          나의 식물을 등록하고
          <br />
          매일 성장하는 식물의 변화를 기록해 보세요
        </p>
        <Button
          color="secondary"
          size="md"
          className="w-[9.5rem]"
          onClick={() => redirect('/diary/newenroll')}
        >
          식물 등록하기
        </Button>
      </div>
    </div>
  );
};

const MBHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };
  const [bottomOffset, setBottomOffset] = useState('25rem');

  useEffect(() => {
    const height = window.innerHeight;

    if (height < 750) {
      setBottomOffset('22rem');
    } else if (height < 850) {
      setBottomOffset('24rem');
    } else {
      setBottomOffset('26.5rem');
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-start pb-20">
      <div className="title1 text-text2 mt-8 mb-3 w-full pl-6 text-start">
        식집사님의 기록
      </div>
      <div className="relative flex aspect-[390/1056] w-screen flex-col items-center justify-center bg-[url('/images/diary/enroll_note_mo.svg')] bg-contain bg-center bg-no-repeat pb-[550px]">
        {!isOpen && (
          <>
            <p className="subTitle text-text2 mb-5 text-center">
              아직 등록된 식물이 없어요
            </p>
            <p className="body1 mb-14 text-center text-[#666]">
              나의 식물을 등록하고
              <br />
              매일 성장하는 식물의 변화를 기록해 보세요
            </p>
            <Button
              onClick={handleOpen}
              color="secondary"
              size="md"
              className="w-[9.5rem]"
            >
              식물 등록하기
            </Button>
          </>
        )}
        {isOpen && (
          <div
            ref={cardRef}
            className="absolute"
            style={{ bottom: bottomOffset }}
          >
            <PlantCard
              onClose={() => setIsOpen(false)}
              onSubmit={async (name, type) => {
                await createPlantCard({ name, type });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <div className="block md:hidden">
        <MBHome />
      </div>
      <div className="hidden md:block">
        <PCHome />
      </div>
    </>
  );
}
