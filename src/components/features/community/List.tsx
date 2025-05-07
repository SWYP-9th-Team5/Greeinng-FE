'use client';

import { useState } from 'react';

import Image from 'next/image';

import { getUpdatedLike } from '@hooks/useLikeToggle';
import { usePagination } from '@hooks/usePagination';

import Pagination from './Pagination';

interface CommunityData {
  id: number;
  title: string; //글 제목
  detail: string; //글 내용
  likecount: number; //좋아요 수
  commentcount: number; //댓글 수
  like: boolean; //좋아요 여부
}

interface CommunityDataProps {
  data: CommunityData[];
  label: string; //카테고리(qna, 자유, 나눔)
}

export function CommunityList({ data, label }: CommunityDataProps) {
  const [items, setItems] = useState(data);
  const { currentPage, currentItems, totalPages, handlePageClick } =
    usePagination(items, 5); //페이지네이션 5개씩

  const handleToggleLike = (id: number) => {
    //좋아요 버튼 조작
    setItems((prev) => getUpdatedLike(prev, id));
  };

  return (
    <div className="flex w-full flex-col">
      {currentItems.map((item) => (
        <div
          key={item.id}
          className="relative flex h-16 w-full flex-col justify-center border-b-1 border-[#ddd] md:h-20 md:flex-row md:items-center md:justify-start md:px-6"
        >
          <p className="body2 text-tertiary md:pr-2">{label}</p>
          <div className="flex flex-row items-center justify-between">
            <p className="body1 max-w-80 overflow-hidden break-words text-ellipsis whitespace-nowrap text-[#666] md:max-w-lg">
              {item.title}
            </p>
            <div className="ml-2 flex flex-shrink-0 flex-row md:absolute md:right-6">
              <button
                onClick={() => handleToggleLike(item.id)}
                className="mr-1"
              >
                <Image
                  src={
                    item.like ? '/icons/heart_fill_b.svg' : '/icons/heart_b.svg'
                  }
                  alt="좋아요 버튼"
                  width={14}
                  height={14}
                />
              </button>
              <p className="body1 mr-3 text-[#666]">{item.likecount}</p>
              <Image
                src="/icons/message_b.svg"
                alt="댓글 버튼"
                width={16}
                height={16}
                className="mr-1"
              />
              <p className="body1 text-[#666]">{item.commentcount}</p>
            </div>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageClick={handlePageClick}
      />
    </div>
  );
}
