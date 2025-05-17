'use client';

import { cn } from '@/utils/cn';

import CommentCount from '../../common/CommentCount';
import LikeButton from '../../common/LikeButton';

// ! 포맷 구조 나오면 수정 예정
interface PostButtonProps {
  isLike: boolean;
  likeCount: number;
  commentCount: number;
  handleToggleLike: () => void;
}

export default function PostButton({
  isLike,
  likeCount,
  commentCount,
  handleToggleLike,
}: PostButtonProps) {
  return (
    <div
      className={cn(
        'mb-5 flex w-full items-center gap-2 border-b-1 border-[#EEE] pb-4',
        'md:mb-7 md:gap-3 md:pb-2',
      )}
    >
      <LikeButton
        isLike={isLike}
        count={likeCount}
        handleToggleLike={handleToggleLike}
      />
      <CommentCount count={commentCount} />
    </div>
  );
}
