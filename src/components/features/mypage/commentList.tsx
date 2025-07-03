'use client';

import Pagination from '@components/features/All/Pagination';

import { CATEGORY_ID_NAME_MAP } from '@constants/communityData';

export interface CommentItem {
  postId: number;
  categoryId: number;
  commentId: number;
  comment: string;
  postTitle: string;
  createdAt: string;
  lastModifiedAt: string;
}

interface CommentListProps {
  isLoading: boolean;
  commentdata: CommentItem[];
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
}

const CommentList = ({
  isLoading,
  commentdata,
  currentPage,
  totalPages,
  onPageClick,
}: CommentListProps) => {
  if (isLoading) {
    return <p>로딩 중...</p>;
  }
  return (
    <>
      <div className="h-[572px]">
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          commentdata.map((comment, index) => {
            const label = CATEGORY_ID_NAME_MAP[comment.categoryId];
            return (
              <div
                key={index}
                className="relative mt-3 flex h-[102px] w-[542px] flex-col justify-center rounded-[0.94rem] bg-[#F3F3F3] p-4"
              >
                <div className="relative mb-3 flex flex-row">
                  <p className="body2 text-tertiary mr-1">{label}</p>
                  <p className="body2 overflow-hidden break-words text-ellipsis whitespace-nowrap text-[#666]">
                    {comment.postTitle}
                  </p>
                  <p className="body2 absolute right-0 text-[#999]">
                    {comment.createdAt.split('T')[0]}{' '}
                  </p>
                </div>
                <p className="body1 text-text2 overflow-hidden break-words text-ellipsis whitespace-nowrap">
                  {comment.comment}
                </p>
              </div>
            );
          })
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageClick={onPageClick}
      />
    </>
  );
};

export default CommentList;
