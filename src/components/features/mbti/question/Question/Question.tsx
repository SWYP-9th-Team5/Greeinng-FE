import { cn } from '@/utils/cn';

export default function Question({ children }: { children: React.ReactNode }) {
  return <h2 className={cn('title2 text-center')}>{children}</h2>;
}
