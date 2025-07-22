'use client';

import React from 'react';

import CommentList from '@components/features/mypage/commentList';
import PostList from '@components/features/mypage/postList';

import { useMyComments } from './hooks/useMyComment';
import { useMyName } from './hooks/useMyName';
import { useMyPosts } from './hooks/useMyPost';

export default function Page() {
  const nameData = useMyName();

  const {
    postdata,
    isLoading,
    currentPage: postcurrentPage,
    totalPages: posttotalPages,
    handlePageClick: posthandlePageClick,
  } = useMyPosts();

  const {
    commentdata,
    iscoLoading,
    currentPage: commentcurrentPage,
    totalPages: commenttotalPages,
    handlePageClick: commenthandlePageClick,
  } = useMyComments();

  return (
    <div className="flex flex-col items-center pb-20">
      <div className="title2 mt-10 flex h-14 w-[22rem] items-center rounded-[15px] bg-[#FEFEFE] pt-1 pl-3 md:h-20 md:w-[75rem] md:rounded-[20px] md:pl-10">
        {(nameData?.userName || 'OOO') + '님'}
      </div>
      <div className="mt-2 flex flex-col gap-2 md:mt-5 md:flex-row md:gap-5">
        <div className="title2 flex h-[29.3rem] w-[22rem] flex-col overflow-y-auto rounded-[20px] bg-[#FEFEFE] pt-4 pl-3 md:h-[670px] md:w-[590px] md:rounded-[20px] md:pt-6 md:pl-6">
          <p className="md:mb-2">내가 쓴 글</p>
          <PostList
            isLoading={isLoading}
            postdata={postdata}
            currentPage={postcurrentPage}
            totalPages={posttotalPages}
            onPageClick={posthandlePageClick}
          />
        </div>
        <div className="title2 flex h-[35.6rem] w-[22rem] flex-col overflow-y-auto rounded-[20px] bg-[#FEFEFE] pt-4 pl-3 md:h-[670px] md:w-[590px] md:rounded-[20px] md:pt-6 md:pl-6">
          <p className="md:mb-2">내가 쓴 댓글</p>
          <CommentList
            isLoading={iscoLoading}
            commentdata={commentdata}
            currentPage={commentcurrentPage}
            totalPages={commenttotalPages}
            onPageClick={commenthandlePageClick}
          />
        </div>
      </div>
    </div>
  );
}
