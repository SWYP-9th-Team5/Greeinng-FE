import React, { ReactNode } from 'react';

// 공통 뷰
type SliderViewProps = {
  slides: ReactNode[];
  currentIndex: number;
  heightClass: string;
};

export default function SliderView({
  slides,
  currentIndex,
  heightClass,
}: SliderViewProps) {
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
