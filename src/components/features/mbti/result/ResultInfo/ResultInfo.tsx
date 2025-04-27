import React from 'react';

import { cn } from '@/utils/cn';
import Image from 'next/image';

const resultData = {
  title: '고무나무',
  src: '/images/Rubber@2x.png',
  des1: '빠르게 성장하고, 방향성도 뚜렷!\n집 안 중심을 잡아주는 리더 식물로 완벽 매치',
  des2: '“리더십과 추진력, 식물계 CEO ✨\n보는 순간 ‘성장하겠다’는 기운이 뿜뿜해요!”\n당신 옆엔 언제나 큰 잎과 큰 포부가 함께하죠.',
  recommend: '🪴추천 식물 : 드라세나, 스파티필름, 아레카야자',
  ok: '드래곤트리',
  notok: '스킨답서스',
};

const RecommendCard = ({ label, text }: { label: string; text: string }) => {
  return (
    <div
      className={cn(
        'bg-tertiary flex w-full flex-col gap-1 rounded-[0.625rem] px-[2.1875rem] py-4 text-[#fff]',
      )}
    >
      <strong
        className={cn(
          'font-HappinessB leading-[1.375rem]] text-[0.875rem] tracking-[-0.0175rem]',
          'md:font-[1rem]',
        )}
      >
        {label}
      </strong>
      <span
        className={cn(
          'body1 leading-[1.375rem] tracking-[-0.0175rem] text-[rgba(255,255,255,0.90)]',
        )}
      >
        {text}
      </span>
    </div>
  );
};

export default async function ResultInfo() {
  const { title, src, des1, des2, recommend, ok, notok } = resultData;

  const cardData = [
    { label: '잘 맞는 식물 유형', text: ok },
    { label: '안 맞는 식물 유형', text: notok },
  ];

  return (
    <section className={cn('w-full flex-col justify-items-center text-center')}>
      <h2 className={cn('title2 mb-3 text-[#333]')}>{title}</h2>
      <p className={cn('body1 mb-3 whitespace-pre-line', 'md:mb-10')}>{des1}</p>
      <Image
        className={cn('mb-[1.875rem]')}
        src={src}
        alt={title}
        width={350}
        height={350}
      />
      <p className={cn('body1 mb-4 whitespace-pre-line')}>{des2}</p>
      <em className={cn('dy1 text-secondary mb-8 inline-block')}>
        {recommend}
      </em>
      <div className={cn('flex w-full gap-4')}>
        {cardData.map((item) => {
          return (
            <RecommendCard
              key={item.label}
              label={item.label}
              text={item.text}
            />
          );
        })}
      </div>
    </section>
  );
}
