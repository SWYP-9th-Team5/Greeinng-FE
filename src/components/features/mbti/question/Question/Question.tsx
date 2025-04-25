import { cn } from '@/utils/cn';

export default function Question({ question }: { question: string }) {
  return <h2 className={cn('title2 text-center')}>{question}</h2>;
}
