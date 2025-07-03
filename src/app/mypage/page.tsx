'use client';

import React from 'react';

import CommentList from '@components/features/mypage/commentList';
import PostList from '@components/features/mypage/postList';

import { useMyComments } from './hooks/useMyComment';
import { useMyPosts } from './hooks/useMyPost';

const PCMypage = () => {
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
      <div className="title2 mt-13 flex h-20 w-[75rem] items-center rounded-[20px] bg-[#FCFCFC] pl-10">
        아이디님
      </div>
      <div className="mt-5 flex flex-row">
        <div className="title2 flex h-[700px] w-[590px] flex-col overflow-y-auto rounded-[20px] bg-[#FCFCFC] pt-6 pl-8">
          <p className="mb-2">내가 쓴 글</p>
          <PostList
            isLoading={isLoading}
            postdata={postdata}
            currentPage={postcurrentPage}
            totalPages={posttotalPages}
            onPageClick={posthandlePageClick}
          />
        </div>
        <div className="title2 ml-5 flex h-[700px] w-[590px] flex-col overflow-y-auto rounded-[20px] bg-[#FCFCFC] pt-6 pl-8">
          <p className="mb-2">내가 쓴 댓글</p>
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
};

const MBMypage = () => {
  return <></>;
};

export default function page() {
  return (
    <>
      <div className="block md:hidden">
        <MBMypage />
      </div>
      <div className="hidden md:block">
        <PCMypage />
      </div>
    </>
  );
}
