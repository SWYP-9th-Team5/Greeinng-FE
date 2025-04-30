import { cn } from '@/utils/cn';

import { getMbtiStepData } from '../../utils/utils';

export default function Question({ numberStep }: { numberStep: number }) {
  const { question } = getMbtiStepData(numberStep);
  return <h2 className={cn('title2 text-center')}>{question}</h2>;
}
