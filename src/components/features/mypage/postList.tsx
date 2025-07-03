'use client';

import Image from 'next/image';

import Pagination from '@components/features/All/Pagination';
import type { PostItem } from '@components/features/main/Community/MainTabbar';

import { CATEGORY_ID_NAME_MAP } from '@constants/communityData';

interface PostListProps {
  isLoading: boolean;
  postdata: PostItem[];
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
}

const PostList = ({
  isLoading,
  postdata,
  currentPage,
  totalPages,
  onPageClick,
}: PostListProps) => {
  if (isLoading) {
    return <p>로딩 중...</p>;
  }
  return (
    <>
      <div className="h-[575px]">
        {postdata.map((post, index) => {
          const label = CATEGORY_ID_NAME_MAP[post.categoryId];
          return (
            <div
              key={index}
              className="relative mt-3 flex h-[61px] w-[542px] flex-row items-center rounded-[0.625rem] bg-[#F3F3F3] p-4"
            >
              <p className="subTitle text-tertiary mr-1">{label}</p>
              <p className="subTitle overflow-hidden break-words text-ellipsis whitespace-nowrap text-[#666]">
                {post.title}
              </p>
              <div className="absolute right-4 flex flex-row items-center">
                <Image
                  src="/icons/heart_b.svg"
                  alt="좋아요"
                  width={14}
                  height={14}
                  className="mr-1"
                />
                <p className="body1 mr-3 text-[#666]">{post.likeCount}</p>
                <Image
                  src="/icons/message_b.svg"
                  alt="댓글"
                  width={16}
                  height={16}
                  className="mr-1"
                />
                <p className="body1 text-[#666]">{post.commentCount}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageClick={onPageClick}
      />
    </>
  );
};

export default PostList;
