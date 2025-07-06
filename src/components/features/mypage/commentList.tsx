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
      <div className="h-[455px] md:h-[520px]">
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          commentdata.map((comment, index) => {
            const label = CATEGORY_ID_NAME_MAP[comment.categoryId];
            return (
              <div
                key={index}
                className="relative mt-2 flex h-[84px] w-[326px] flex-col justify-center rounded-[0.94rem] bg-[#F3F3F3] pl-3 md:mt-3 md:h-[92px] md:w-[542px] md:p-4"
              >
                <div className="relative flex flex-row md:mb-3">
                  <p className="body2 text-tertiary mr-1">{label}</p>
                  <p className="body2 overflow-hidden break-words text-ellipsis whitespace-nowrap text-[#666]">
                    {comment.postTitle}
                  </p>
                  <p className="body2 absolute right-0 hidden text-[#999] md:block">
                    {comment.createdAt.split('T')[0].split('-').join('.')}
                  </p>
                </div>
                <p className="body1 text-text2 overflow-hidden break-words text-ellipsis whitespace-nowrap">
                  {comment.comment}
                </p>
                <p className="body2 block text-[#999] md:hidden">
                  {comment.createdAt.split('T')[0].split('-').join('.')}
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
