'use client';

import React, { ReactNode } from 'react';

import { MBMainSection, PCMainSection } from './MainSection';
import SliderView from './SliderView';
import useAutoSlider from './Slidereffect';

export default function ImageSlider() {
  // PC 슬라이드 정의
  const pcSlides: ReactNode[] = [
    <PCMainSection
      key={1}
      bgColor="bg-[#F9FFEE]"
      bgImageUrl="/images/main/main_1_pc.png"
      bgPosition="bg-bottom"
    >
      <p>
        식물을 키우는 모든 순간
        <br />
        Greening에서
      </p>
    </PCMainSection>,
    <PCMainSection
      key={2}
      bgColor="bg-[#FDFCEF]"
      bgImageUrl="/images/main/main_2_pc.png"
      bgPosition="bg-center"
    >
      <p>
        식집사들을 위한 커뮤니티
        <br />
        Greening에서
        <br />
        다양한 정보를 공유해 보세요
      </p>
    </PCMainSection>,
  ];
  const pcIndex = useAutoSlider(pcSlides.length);

  // 모바일 슬라이드 정의
  const mbSlides: ReactNode[] = [
    <MBMainSection
      key={1}
      bgColor="bg-[#F9FFEE]"
      bgImageUrl="/images/main/main_1_mb.png"
      bgPosition="bg-bottom"
    >
      <p>
        식물을 키우는 모든 순간
        <br />
        Greening에서
      </p>
    </MBMainSection>,
    <MBMainSection
      key={2}
      bgColor="bg-[#FDFCEF]"
      bgImageUrl="/images/main/main_2_mb.png"
      bgPosition="bg-center"
    >
      <p>
        식집사들을 위한 커뮤니티
        <br />
        Greening에서
        <br />
        다양한 정보를 공유해 보세요
      </p>
    </MBMainSection>,
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
