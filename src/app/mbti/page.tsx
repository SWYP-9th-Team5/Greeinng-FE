import React from 'react';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '나는 어떤 식물일까?',
  description: '간단한 유형 검사를 통해 나는 무슨 식물일지 알아보세요🪴',
};

const introText = `
물은 얼마나 줘야하지? 방치해도 될까?
내가 식물이라면 과연 어떻게 키워야할까요?
간단한 유형 검사를 통해 나는 무슨 식물일지 알아보세요🪴
`.trim();

export default function MbtiPage() {
  const href = '/mbti/question/1';
  const title = '나는 어떤 식물일까?';
  const testBtnText = '테스트 시작하기';

  return (
    <>
      <h1 className="title1 text-primary mb-[24px] md:mb-[40px]">{title}</h1>
      <div className="mb-[24px] flex flex-col items-center justify-center md:mb-[0px]">
        {introText.split('\n').map((text, index) => (
          <p
            key={index}
            className="font-HappinessR body1 tracking-[-0.32px] text-[#333]"
          >
            {text}
          </p>
        ))}
      </div>
      <div className="max-xxs:w-full mb-[18px] w-[350px] md:mb-[7px] md:w-[400px]">
        <Image
          className="w-full"
          src={'/images/Q0-0@2x.png'}
          alt={title}
          width={400}
          height={400}
          loading="lazy"
        />
      </div>
      <Link
        href={href}
        className="font-HappinessB bg-primary w-full rounded-[50px] py-[8px] text-center text-[0.875rem] whitespace-nowrap text-[#fff] md:w-[386px] md:py-[16px] md:text-[1rem]"
      >
        {testBtnText}
      </Link>
    </>
  );
}
