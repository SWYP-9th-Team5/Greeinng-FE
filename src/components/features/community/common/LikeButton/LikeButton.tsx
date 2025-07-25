import React from 'react';

import Image from 'next/image';

type LikeButton = {
  isLike: boolean;
  count: number;
  handleToggleLike: () => void;
};

export default function LikeButton({
  isLike,
  count,
  handleToggleLike,
}: LikeButton) {
  return (
    <div className="flex items-center">
      <button
        className="mr-1 w-[0.875rem] md:w-[1.125rem]"
        onClick={handleToggleLike}
      >
        <Image
          src={isLike ? '/icons/heart_fill_b.svg' : '/icons/heart_b.svg'}
          alt="좋아요 버튼"
          width={18}
          height={18}
        />
      </button>
      <span className="body1 text-[#666]">{count}</span>
    </div>
  );
}
