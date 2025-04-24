import React from 'react';

import { cn } from '@/utils/cn';

import Answer from '@components/features/mbti/\bquestion/Answer';
import Question from '@components/features/mbti/\bquestion/Question';

import { pcMbtiData } from '@constants/mbtiData';

export function generateStaticParams() {
  return [{ step: '1' }, { step: '2' }, { step: '3' }];
}

export default async function page({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;

  const question = pcMbtiData[Number(step) - 1].question;

  const imageASrc = pcMbtiData[Number(step) - 1].imageA;
  const imageAAlt = pcMbtiData[Number(step) - 1].answerA;

  const imageBSrc = pcMbtiData[Number(step) - 1].imageB;
  const imageBAlt = pcMbtiData[Number(step) - 1].answerB;

  const href = `/mbti/test/${Number(step) + 1}`;
  const answerList = [
    {
      src: imageASrc,
      alt: imageAAlt,
    },
    {
      src: imageBSrc,
      alt: imageBAlt,
    },
  ];

  return (
    <>
      {/* 모바일 */}
      <section className={cn('flex flex-col gap-[52px] md:hidden')}>
        <Question question={question} />
        <Answer href={href} answerList={answerList} />
      </section>
      {/* PC */}
      <section className="hidden flex-col gap-4 md:flex">
        <Question question={question} />
        <Answer href={href} answerList={answerList} />
      </section>
    </>
  );
}
