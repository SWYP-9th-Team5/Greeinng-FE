import { cn } from '@/utils/cn';

import ResultButton from '@components/features/mbti/result/ResultButton';
import ResultInfo from '@components/features/mbti/result/ResultInfo';

export default async function MbtiResultPage() {
  return (
    <article className={cn('flex flex-col gap-8')}>
      <h1 className="sr-only">MBTI 결과</h1>
      <ResultInfo />
      <ResultButton />
    </article>
  );
}
