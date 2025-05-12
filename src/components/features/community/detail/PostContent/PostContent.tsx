import React from 'react';

import { cn } from '@/utils/cn';
import Image from 'next/image';

const content =
  '몬스테라를 키우고 있는데 최근에 잎 끝이 갈색으로 말라가요ㅠㅠ물은 일주일에 한 번씩 주고 있어요.\n왜 이런 걸까요?';

// ! 포맷 보고 재수정 필요함
export default function PostContent() {
  return (
    <section className="mb-10 md:mb-16">
      <p className={cn('body1 whitespace-pre-line text-[#666]')}>{content}</p>
      <Image
        src="/images/mbti/result/INT_Catus@2x.png"
        alt="Cactus illustration"
        width={720}
        height={720}
      />
    </section>
  );
}
