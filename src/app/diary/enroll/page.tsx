'use client';

import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

import { useDiaryModalStore } from '@/stores/useDiaryModalStore';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import Button from '@components/common/Button';
import { PlantEnrollCard } from '@components/features/diary/emrollPlant';
import PostModal from '@components/features/diary/modal/PostModal';
import { MyPlantCard } from '@components/features/diary/myPlantCard';
import { PCNoMyPlants } from '@components/features/diary/noMyPlants';

import { MyPlantItem, createPlantCard, fetchMyPlant } from '@apis/data/diary';

const PCHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [plantList, setPlantList] = useState<MyPlantItem[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<MyPlantItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMyPlant();
        setPlantList(data);
      } catch (error) {
        console.error('식물 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pb-20">
      <div className="title1 text-text2 mt-14 mb-4 w-[1200px] text-start">
        식집사님의 기록
      </div>
      {isLoading ? (
        <div className="flex h-[716px] w-[1200px] items-center justify-center">
          <p className="subTitle text-text2">불러오는 중...</p>
        </div>
      ) : plantList.length === 0 ? (
        <PCNoMyPlants />
      ) : (
        <div className="relative flex h-[716px] w-[1200px] flex-row items-start bg-[url('/images/diary/enroll_note_pc.svg')] bg-contain bg-center bg-no-repeat pt-14 pl-14">
          <div className="scroll-container grid h-[596px] w-[492px] grid-cols-3 gap-x-7 gap-y-5 overflow-y-auto pr-7">
            {plantList.map((plant) => (
              <button
                key={plant.id}
                onClick={() => setSelectedPlant(plant)}
                className={`flex h-[11.8rem] w-[8.5rem] flex-col items-center justify-center rounded-[10px] ${
                  selectedPlant?.id === plant.id ? 'bg-[#eee]' : ''
                }`}
              >
                <Image
                  src="/images/diary/enroll_plant.svg"
                  alt="식물 아이콘"
                  width={78}
                  height={94}
                  className="h-auto w-[50px] md:w-[80px]"
                />
                <p className="body1 mt-6">{plant.name}</p>
              </button>
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
              <p className="body1 absolute bottom-[1.4rem]">추가하기</p>
            </button>
          </div>
          <div className="flex flex-col">
            {selectedPlant ? (
              <div className="absolute top-10 right-11">
                <MyPlantCard
                  onClose={() => setSelectedPlant(null)}
                  name={selectedPlant.name}
                  type={selectedPlant.type}
                  createdAt={selectedPlant.createdAt}
                  id={selectedPlant.id}
                />
              </div>
            ) : (
              <div className="absolute right-36 bottom-80 text-center">
                <p className="subTitle text-text2">
                  어떤 식물의 일기를 볼까요?
                </p>
                <p className="body1 mt-5 text-[#666]">
                  일기를 보려면 왼쪽 페이지의 식물을 클릭하세요.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const MBHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [plantList, setPlantList] = useState<MyPlantItem[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<MyPlantItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [bottomOffset, setBottomOffset] = useState('25rem');
  const [bottomOffset2, setBottomOffset2] = useState('2rem');

  const cardRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const loadPlantList = async () => {
    try {
      const res = await fetchMyPlant();
      setPlantList(res);
    } catch (err) {
      console.error('❌ 식물 리스트 불러오기 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlantList();
  }, []);

  useEffect(() => {
    if (selectedPlant) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  }, [selectedPlant]);

  useEffect(() => {
    const height = window.innerHeight;

    if (height < 750) {
      setBottomOffset('22rem');
      setBottomOffset2('2rem');
    } else if (height < 850) {
      setBottomOffset('24rem');
      setBottomOffset2('1.5rem');
    } else {
      setBottomOffset('26.5rem');
      setBottomOffset2('3rem');
    }
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const handleSubmit = async (name: string, type: string) => {
    try {
      await createPlantCard({ name, type });
      await loadPlantList();
      setIsOpen(false);
      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    } catch (err) {
      console.error('식물 등록 실패:', err);
    }
  };
  const handleClose = async () => {
    setIsOpen(false);
    await loadPlantList();

    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <div className="flex flex-col items-center justify-start pb-20">
      <div
        ref={topRef}
        className="title1 text-text2 mt-8 mb-3 w-full pl-6 text-start"
      >
        식집사님의 기록
      </div>
      <div className="relative flex aspect-[390/1056] w-screen flex-col items-center justify-center bg-[url('/images/diary/enroll_note_mo.svg')] bg-contain bg-center bg-no-repeat pb-[550px]">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <p className="subTitle text-text2">불러오는 중...</p>
          </div>
        ) : plantList.length === 0 ? (
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
        ) : (
          <div className="grid h-[468px] auto-rows-[7.7rem] grid-cols-3 gap-x-7 gap-y-10 overflow-y-auto pt-4">
            {plantList.map((plant) => (
              <button
                key={plant.id}
                onClick={() => setSelectedPlant(plant)}
                className={`flex h-[7.7rem] w-[5.5rem] flex-col items-center justify-center rounded-[10px] ${
                  selectedPlant?.id === plant.id ? 'bg-[#eee]' : ''
                }`}
              >
                <Image
                  src="/images/diary/enroll_plant.svg"
                  alt="식물 아이콘"
                  width={78}
                  height={94}
                  className="h-auto w-[50px] md:w-[80px]"
                />
                <p className="body1 mt-3.5">{plant.name}</p>
              </button>
            ))}
            <button
              className="relative flex h-[7.7rem] w-[5.5rem] flex-col items-center justify-center"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2399999999' stroke-width='5' stroke-dasharray='6%2c14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
                borderRadius: '20px',
              }}
              onClick={handleOpen}
            >
              <Image
                src="/icons/plus.svg"
                alt="플러스 아이콘"
                width={24}
                height={24}
              />
              <p className="body1 absolute bottom-[1.4rem]">추가하기</p>
            </button>
          </div>
        )}
        {selectedPlant && (
          <div
            ref={cardRef}
            className="absolute"
            style={{ bottom: bottomOffset2 }}
          >
            <MyPlantCard
              onClose={() => {
                setSelectedPlant(null);
                setTimeout(() => {
                  topRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }, 0);
              }}
              name={selectedPlant.name}
              type={selectedPlant.type}
              createdAt={selectedPlant.createdAt}
              id={selectedPlant.id}
            />
          </div>
        )}
        {isOpen && (
          <div
            ref={cardRef}
            className="absolute"
            style={{ bottom: bottomOffset }}
          >
            <PlantEnrollCard onClose={handleClose} onSubmit={handleSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const isOpenDiaryModal = useDiaryModalStore(
    (state) => state.isOpenDiaryModal,
  );
  return (
    <>
      <div className="block md:hidden">
        <MBHome />
      </div>
      <div className="hidden md:block">
        <PCHome />
      </div>
      {isOpenDiaryModal && <PostModal />}
    </>
  );
}
