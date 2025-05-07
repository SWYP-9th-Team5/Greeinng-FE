import { useState } from 'react';

export function useLikeToggle(initialData: {
  id: number;
  like: boolean;
  likecount: number;
}) {
  const [like, setLike] = useState(initialData.like);
  const [likeCount, setLikeCount] = useState(initialData.likecount);

  const toggleLike = () => {
    setLike((prev) => !prev);
    setLikeCount((prev) => (like ? prev - 1 : prev + 1));
  };

  return { like, likeCount, toggleLike };
}

export function getUpdatedLike(items: any[], targetId: number) {
  return items.map((item) =>
    item.id === targetId
      ? {
          ...item,
          like: !item.like,
          likecount: item.like ? item.likecount - 1 : item.likecount + 1,
        }
      : item,
  );
}
