'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Pagination from '@components/features/All/Pagination';
import type { PostItem } from '@components/features/main/Community/MainTabbar';

import { COMMUNITY_LIST } from '@constants/communityData';
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
  const router = useRouter();

  if (isLoading) {
    return <p>로딩 중...</p>;
  }
  return (
    <>
      <div className="h-[355px] md:h-[520px]">
        {postdata.map((post, index) => {
          const label = CATEGORY_ID_NAME_MAP[post.categoryId];
          const findCategoryItem = COMMUNITY_LIST.find(
            ({ value }) => value === post.categoryId + '',
          );
          return (
            <div
              key={index}
              className="relative mt-2 flex h-[64px] w-[326px] cursor-pointer flex-col justify-center rounded-[0.625rem] bg-[#F3F3F3] pl-4 md:mt-3 md:h-[61px] md:w-[542px] md:flex-row md:items-center md:justify-start"
              onClick={() =>
                router.push(
                  `/community/${findCategoryItem?.path}/${post.postId}`,
                )
              }
            >
              <p className="subTitle text-tertiary mr-1">{label}</p>
              <div className="flex flex-row">
                <p className="body1 md:subTitle overflow-hidden break-words text-ellipsis whitespace-nowrap text-[#666]">
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
