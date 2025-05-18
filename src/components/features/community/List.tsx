'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getUpdatedLike } from '@hooks/useLikeToggle';

import { COMMUNITY_LIST } from '@constants/communityData';

import Pagination from '../All/Pagination';
import type { PostItem } from '../main/Community/MainTabbar';

interface CommunityDataProps {
  data: PostItem[];
  type: string;
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
}

export function CommunityList({
  data,
  type,
  currentPage,
  totalPages,
  onPageClick,
}: CommunityDataProps) {
  const [items, setItems] = useState(data);
  useEffect(() => {
    setItems(data);
  }, [data]);

  const label = COMMUNITY_LIST.find(({ path }) => path === type)?.label;

  const handleToggleLike = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    e.preventDefault();
    //좋아요 버튼 조작
    setItems((prev) => getUpdatedLike(prev, id));
  };

  return (
    <div className="relative flex min-h-[60vh] w-full flex-col">
      {items.map((item) => (
        <Link
          href={`/community/${type}/${item.postId}`}
          key={item.postId}
          className="relative flex h-20 w-full flex-col justify-center border-b-1 border-[#ddd] md:h-20 md:flex-row md:items-center md:justify-start md:px-6"
        >
          <p className="body2 text-tertiary md:pr-2">{label}</p>
          <div className="flex flex-row items-center justify-between">
            <p className="body1 max-w-80 overflow-hidden break-words text-ellipsis whitespace-nowrap text-[#666] md:max-w-lg">
              {item.title}
            </p>
            <div className="ml-2 flex flex-shrink-0 flex-row md:absolute md:right-6">
              <button
                onClick={(e) => handleToggleLike(e, item.postId)}
                className="mr-1"
              >
                <Image
                  src={
                    item.isLike
                      ? '/icons/heart_fill_b.svg'
                      : '/icons/heart_b.svg'
                  }
                  alt="좋아요 버튼"
                  width={14}
                  height={14}
                />
              </button>
              <p className="body1 mr-3 text-[#666]">{item.likeCount}</p>
              <Image
                src="/icons/message_b.svg"
                alt="댓글 버튼"
                width={16}
                height={16}
                className="mr-1"
              />
              <p className="body1 text-[#666]">{item.commentCount}</p>
            </div>
          </div>
        </Link>
      ))}
      <div className="absolute bottom-3 w-full justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageClick={onPageClick}
        />
      </div>
    </div>
  );
}
