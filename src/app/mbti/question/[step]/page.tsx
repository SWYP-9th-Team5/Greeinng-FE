import { cn } from '@/utils/cn';
import { redirect } from 'next/navigation';

import Answer from '@components/features/mbti/question/Answer';
import Question from '@components/features/mbti/question/Question';
import {
  QueryParams,
  calMbtiResult,
} from '@components/features/mbti/utils/utils';

interface PageProps {
  params: Promise<{ step: string }>;
  searchParams: Promise<QueryParams>;
}

export function generateStaticParams() {
  return [{ step: '1' }, { step: '2' }, { step: '3' }];
}

export default async function page({ params, searchParams }: PageProps) {
  const { step } = await params;

  const paramsQuery = await searchParams;
  const numberStep = Number(step);

  const { answer1, answer2, answer3 } = paramsQuery;

  // 3step 이상
  if (numberStep > 3) {
    const isAnswer = answer1 && answer2 && answer3;
    // 모든 정답이 있을 경우 아니라면 테스트 시작하기 페이지로 이동
    if (isAnswer) {
      const mbtiResult = calMbtiResult(paramsQuery);
      redirect(`/mbti/result/${mbtiResult}`);
    }
    redirect('/mbti');
  }

  return (
    <>
      {/* 모바일 */}
      <section className={cn('flex flex-col gap-[52px] md:hidden')}>
        <Question numberStep={numberStep} />
        <Answer numberStep={numberStep} paramsQuery={paramsQuery} />
      </section>
      {/* PC */}
      <section className="hidden flex-col gap-26 md:flex">
        <Question numberStep={numberStep} />
        <Answer numberStep={numberStep} paramsQuery={paramsQuery} />
      </section>
    </>
  );
}
