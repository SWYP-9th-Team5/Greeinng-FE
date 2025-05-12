import React from 'react';

import Image from 'next/image';

export default function CommentCount({ count }: { count: number }) {
  return (
    <div className="flex w-[0.875rem] items-center gap-1 md:w-[1.125rem]">
      <Image
        src="/icons/message_b.svg"
        alt="댓글 버튼"
        width={18}
        height={18}
      />
      <p className="body1 text-[#666]">{count}</p>
    </div>
  );
}
