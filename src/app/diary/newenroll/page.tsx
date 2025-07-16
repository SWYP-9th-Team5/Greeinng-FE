'use client';

import React from 'react';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';

import { PlantEnrollCard } from '@components/features/diary/emrollPlant';

import { createPlantCard } from '@apis/data/diary';
import { fetchMyPlant } from '@apis/data/diary';

const PCHome = () => {
  const isOpen = true;
  const router = useRouter();

  const [namelist, setNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchMyPlant();
      const nameList = res.map((plant) => plant.name);
      setNames(nameList);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pb-20">
      <div className="title1 text-text2 mt-14 mb-4 w-[1200px] text-start">
        식집사님의 기록
      </div>
      <div className="relative flex h-[716px] w-[1200px] flex-row items-center bg-[url('/images/diary/enroll_note_pc.svg')] bg-contain bg-center bg-no-repeat pl-14">
        {namelist.length === 0 ? (
          <div></div>
        ) : (
          <div className="scroll-container grid h-[596px] w-[492px] grid-cols-3 gap-x-7 gap-y-5 overflow-y-auto pr-7">
            {namelist.map((name, index) => (
              <div
                key={index}
                className="flex h-[11.8rem] w-[8.5rem] flex-col items-center justify-center"
              >
                <Image
                  src="/images/diary/enroll_plant.svg"
                  alt="식물 아이콘"
                  width={78}
                  height={94}
                  className="h-auto w-[50px] md:w-[80px]"
                />
                <p className="body1 mt-6">{name}</p>
              </div>
            ))}
            <button
              className="relative flex h-[11.75rem] w-[8.375rem] flex-col items-center justify-center"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2399999999' stroke-width='5' stroke-dasharray='6%2c14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
                borderRadius: '20px',
              }}
              onClick={() => redirect('/diary/newenroll')}
            >
              <Image
                src="/icons/plus.svg"
                alt="플러스 아이콘"
                width={40}
                height={40}
              />
              <p className="body1 absolute bottom-[1.4rem] mt-2">추가하기</p>
            </button>
          </div>
        )}
        {isOpen && (
          <div className="absolute top-10 right-11">
            <PlantEnrollCard
              onClose={() => redirect('/diary/enroll')}
              onSubmit={async (name, type) => {
                await createPlantCard({ name, type });
                router.push('/diary/enroll');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const MBHome = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-20"></div>
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
