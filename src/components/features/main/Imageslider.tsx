'use client';

import React, { ReactNode, useEffect, useState } from 'react';

// 이미지 슬라이드 전환 효과
function useAutoSlider(length: number, delay = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, delay);
    return () => clearInterval(interval);
  }, [length, delay]);

  return currentIndex;
}

// 공통 뷰
type SliderViewProps = {
  slides: ReactNode[];
  currentIndex: number;
  heightClass: string;
};

function SliderView({ slides, currentIndex, heightClass }: SliderViewProps) {
  return (
    <div className={`relative w-full overflow-hidden ${heightClass}`}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === currentIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
          }`}
        >
          {slide}
        </div>
      ))}
    </div>
  );
}

export default function ImageSlider() {
  // PC 슬라이드 정의
  const pcSlides: ReactNode[] = [
    <div
      key={1}
      className="title1 text-primary relative flex min-h-[600px] w-full flex-col items-start justify-center bg-[#F9FFEE] bg-[url('/images/main_1_pc.png')] bg-contain bg-bottom bg-no-repeat pl-[clamp(1rem,5vw,8rem)]"
    >
      <p>
        식물을 키우는 모든 순간
        <br />
        Greening에서
      </p>
    </div>,
    <div
      key={2}
      className="title1 text-primary relative flex min-h-[600px] w-full flex-col items-start justify-center bg-[#FDFCEF] bg-[url('/images/main_2_pc.png')] bg-contain bg-center bg-no-repeat pl-[clamp(1rem,5vw,8rem)]"
    >
      <p>
        식집사들을 위한 커뮤니티
        <br />
        Greening에서
        <br />
        다양한 정보를 공유해 보세요
      </p>
    </div>,
  ];
  const pcIndex = useAutoSlider(pcSlides.length);

  // 모바일 슬라이드 정의
  const mbSlides: ReactNode[] = [
    <div
      key={1}
      className="title1 text-primary relative flex min-h-[500px] w-full flex-col items-start justify-center bg-[#F9FFEE] bg-[url('/images/main_1_mb.png')] bg-cover bg-bottom pl-6"
    >
      <p>
        식물을 키우는 모든 순간
        <br />
        Greening에서
      </p>
    </div>,
    <div
      key={2}
      className="title1 text-primary relative flex min-h-[500px] w-full flex-col items-start justify-center bg-[#F9FFEE] bg-[url('/images/main_2_mb.png')] bg-cover bg-center pl-6"
    >
      <p>
        식집사들을 위한 커뮤니티
        <br />
        Greening에서
        <br />
        다양한 정보를 공유해 보세요
      </p>
    </div>,
  ];
  const mbIndex = useAutoSlider(mbSlides.length);

  return (
    <>
      <div className="block sm:hidden">
        <SliderView
          slides={mbSlides}
          currentIndex={mbIndex}
          heightClass="h-[500px]"
        />
      </div>
      <div className="hidden sm:block">
        <SliderView
          slides={pcSlides}
          currentIndex={pcIndex}
          heightClass="min-h-[600px]"
        />
      </div>
    </>
  );
}
