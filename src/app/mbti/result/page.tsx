import { cn } from '@/utils/cn';

import ResultButton from '@components/features/mbti/result/ResultButton';
import ResultInfo from '@components/features/mbti/result/ResultInfo';

export default async function MbtiResultPage() {
  return (
    <article
      className={cn(
        'm-auto flex flex-col items-center',
        // 작은 모바일
        'max-xxs:w-full',
        // 모바일
        'w-[21.875rem] gap-8 pt-10 pb-14 max-md:px-5',
        // PC
        'md:w-[24.125rem] md:gap-13 md:pt-15 md:pb-25',
      )}
    >
      <h1 className="sr-only">MBTI 결과</h1>
      <ResultInfo />
      <ResultButton />
    </article>
  );
}
