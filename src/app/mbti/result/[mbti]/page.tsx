import { cn } from '@/utils/cn';

import ResultButton from '@components/features/mbti/result/ResultButton';
import ResultInfo from '@components/features/mbti/result/ResultInfo';

import { MBTI_RESULT_LIST } from '@constants/mbtiData';

export function generateStaticParams() {
  return MBTI_RESULT_LIST.map(({ mbtiId }) => ({ mbti: mbtiId }));
}

export default async function MbtiResultPage({
  params,
}: {
  params: Promise<{ mbti: string }>;
}) {
  const { mbti } = await params;
  const resultInfoData = MBTI_RESULT_LIST.find((item) => item.mbtiId === mbti);

  const articleClssName = cn(
    'm-auto flex flex-col items-center',
    // 작은 모바일
    'max-xxs:w-full',
    // 모바일
    'w-[21.875rem] gap-8 pt-10 pb-14 max-md:px-[1.25rem]',
    // PC
    'md:w-[24.125rem] md:gap-13 md:pt-15 md:pb-25',
  );

  return (
    <article className={articleClssName}>
      <h1 className="sr-only">MBTI 결과</h1>
      <ResultInfo {...resultInfoData} />
      <ResultButton />
    </article>
  );
}
