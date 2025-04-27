import React from 'react';

import { cn } from '@/utils/cn';

import Answer from '@components/features/mbti/question/Answer';
import Question from '@components/features/mbti/question/Question';
import { getMbtiStepData } from '@components/features/mbti/utils/getMbtiQuestionData';

export function generateStaticParams() {
  return [{ step: '1' }, { step: '2' }, { step: '3' }];
}

export default async function page({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  const { question, href, answerList } = getMbtiStepData(Number(step));

  return (
    <>
      {/* 모바일 */}
      <section className={cn('flex flex-col gap-[52px] md:hidden')}>
        <Question>{question}</Question>
        <Answer href={href} answerList={answerList} />
      </section>
      {/* PC */}
      <section className="hidden flex-col gap-26 md:flex">
        <Question>{question}</Question>
        <Answer href={href} answerList={answerList} />
      </section>
    </>
  );
}
