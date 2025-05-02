'use client';

import { useEffect, useState } from 'react';

// 이미지 슬라이드 전환 효과
export default function useAutoSlider(length: number, delay = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, delay);
    return () => clearInterval(interval);
  }, [length, delay]);

  return currentIndex;
}
