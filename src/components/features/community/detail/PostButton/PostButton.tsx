'use client';

import { cn } from '@/utils/cn';

import CommentCount from '../../common/CommentCount';
import LikeButton from '../../common/LikeButton';

// ! 포맷 구조 나오면 수정 예정
interface PostButtonProps {
  postId: number;
  userId: number;
  isLike: boolean;
  likeCount: number;
  commentCount: number;
  handleToggleLike: (id: number) => void;
}

export default function PostButton({
  postId,
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
        id={postId}
        isLike={isLike}
        count={likeCount}
        handleToggleLike={handleToggleLike}
      />
      <CommentCount count={commentCount} />
    </div>
  );
}
