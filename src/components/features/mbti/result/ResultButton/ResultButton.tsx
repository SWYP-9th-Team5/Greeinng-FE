import { cn } from '@/utils/cn';

import Button from '@components/common/Button';

export default function ResultButton() {
  return (
    <section>
      <nav className={cn('mb-8 flex flex-col gap-1')}>
        <Button color="secondary">테스트 다시하기</Button>
        <Button color="point">메인화면으로</Button>
      </nav>
      <div className=""></div>
    </section>
  );
}
