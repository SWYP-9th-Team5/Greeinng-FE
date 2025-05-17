import { cn } from '@/utils/cn';
import { redirect } from 'next/navigation';

import Answer from '@components/features/mbti/question/Answer';
import Question from '@components/features/mbti/question/Question';
import {
  QueryParams,
  calMbtiResult,
} from '@components/features/mbti/question/Question/utils/utils';

import { MOBILE_MBTI_QUESTION_LIST } from '@constants/mbtiData';

interface PageProps {
  params: Promise<{ step: string }>;
  searchParams: Promise<QueryParams>;
}

export function generateStaticParams() {
  return MOBILE_MBTI_QUESTION_LIST.map((_, idx) => ({
    step: `${idx + 1}`,
  }));
}

const handleStepRedirect = (numberStep: number, paramsQuery: QueryParams) => {
  for (let i = 1; i < numberStep; i++) {
    const key = `answer${i}` as keyof QueryParams;
    if (!paramsQuery[key]) {
      redirect('/mbti');
      return;
    }
  }
};

const handleFinalStepRedirect = (paramsQuery: QueryParams) => {
  const { answer1, answer2, answer3 } = paramsQuery;
  const isAnswer = answer1 && answer2 && answer3;
  if (isAnswer) {
    const mbtiResult = calMbtiResult(paramsQuery);
    redirect(`/mbti/result/${mbtiResult}`);
  } else {
    redirect('/mbti');
  }
};

const handleCheckRedirect = (numberStep: number, paramsQuery: QueryParams) => {
  handleStepRedirect(numberStep, paramsQuery);

  if (numberStep > 3) {
    handleFinalStepRedirect(paramsQuery);
  }
};

export default async function page({ params, searchParams }: PageProps) {
  const { step } = await params;

  const paramsQuery = await searchParams;
  const numberStep = Number(step);

  // [리다이렉트] 답이 없을 경우, url로 인한 접근
  handleCheckRedirect(numberStep, paramsQuery);
  return (
    <>
      {/* 모바일 */}
      <section className={cn('flex w-full flex-col gap-[52px] md:hidden')}>
        <Question isMobile={true} numberStep={numberStep} />
        <Answer
          isMobile={true}
          numberStep={numberStep}
          paramsQuery={paramsQuery}
        />
      </section>
      {/* PC */}
      <section className="hidden w-full flex-col gap-26 md:flex">
        <Question isMobile={false} numberStep={numberStep} />
        <Answer
          isMobile={false}
          numberStep={numberStep}
          paramsQuery={paramsQuery}
        />
      </section>
    </>
  );
}
