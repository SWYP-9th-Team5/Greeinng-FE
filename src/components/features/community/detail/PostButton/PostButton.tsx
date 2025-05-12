'use client';

import { cn } from '@/utils/cn';

import CommentCount from '../../common/CommentCount';
import LikeButton from '../../common/LikeButton';

// ! 포맷 구조 나오면 수정 예정
export default function PostButton() {
  return (
    <div
      className={cn(
        'mb-5 flex w-full items-center gap-2 border-b-1 border-[#EEE] pb-4',
        'md:mb-7 md:gap-3 md:pb-2',
      )}
    >
      <LikeButton id={1} isLike={true} count={2} handleToggleLike={() => {}} />
      <CommentCount count={3} />
    </div>
  );
}
