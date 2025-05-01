import React from 'react';

import { cn } from '@/utils/cn';
import Image from 'next/image';

const RecommendCard = ({ label, text }: { label: string; text: string }) => {
  return (
    <div
      className={cn(
        'bg-tertiary flex w-full flex-col gap-1 rounded-[0.625rem] px-[2.1875rem] py-4 text-[#fff]',
      )}
    >
      <strong
        className={cn(
          'font-HappinessB text-[0.875rem] leading-[1.375rem] tracking-[-0.0175rem]',
          'md:text-[1rem]',
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

export default async function ResultInfo({ ...resultInfoData }) {
  const {
    plantName,
    plantDescription,
    plantPersonality,
    suitablePlant,
    unsuitablePlant,
    recommendedPlant,
    plantImageUrl,
  } = resultInfoData;

  const cardData = [
    { label: '잘 맞는 식물 유형', text: suitablePlant },
    { label: '안 맞는 식물 유형', text: unsuitablePlant },
  ];

  return (
    <section className={cn('w-full flex-col justify-items-center text-center')}>
      <h2 className={cn('title2 mb-3 text-[#333]')}>{plantName}</h2>
      <p className={cn('body1 mb-3 whitespace-pre-line', 'md:mb-10')}>
        {plantDescription}
      </p>
      <Image
        className={cn('mb-[1.875rem]')}
        src={plantImageUrl}
        alt={plantName}
        width={350}
        height={350}
        priority
      />
      <p className={cn('body1 mb-4 whitespace-pre-line')}>{plantPersonality}</p>
      <em className={cn('dy1 text-secondary mb-8 inline-block')}>
        {recommendedPlant}
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
