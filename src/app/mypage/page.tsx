'use client';

import React from 'react';

import Image from 'next/image';

import CommentList from '@components/features/mypage/commentList';
import PostList from '@components/features/mypage/postList';

import { useMyComments } from './hooks/useMyComment';
import { useMyName } from './hooks/useMyName';
import { useMyPosts } from './hooks/useMyPost';

const PCMypage = () => {
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
      <div className="title2 mt-13 flex h-20 w-[75rem] items-center rounded-[20px] bg-[#FCFCFC] pl-10">
        {nameData?.userName}님
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

interface MyPageCardProps {
  label: string;
}

const MyPageCard = ({ label }: MyPageCardProps) => {
  return (
    <div className="title2 mt-2 flex h-12 w-[20.5rem] flex-row items-center justify-between rounded-[12px] bg-[#F3F3F3] pr-3 pl-3">
      <p className="subTitle">{label}</p>
      <Image src="/icons/arrow.png" alt="화살표" width={6} height={10} />
    </div>
  );
};

const MBMypage = () => {
  const nameData = useMyName();

  return (
    <div className="flex flex-col items-center">
      <div className="title2 mt-13 flex h-14 w-[22rem] items-center rounded-[15px] bg-[#FCFCFC] pl-3">
        {nameData?.userName}님
      </div>
      <div className="mt-2 flex h-[14.4rem] w-[22rem] flex-col justify-center rounded-[20px] bg-[#FCFCFC] pl-3">
        <p className="title2">내가 쓴 글</p>
        <MyPageCard label="QnA" />
        <MyPageCard label="자유게시판" />
        <MyPageCard label="나눔" />
      </div>
      <div className="mt-2 flex h-[14.4rem] w-[22rem] flex-col justify-center rounded-[20px] bg-[#FCFCFC] pl-3">
        <p className="title2">내가 쓴 댓글</p>
        <MyPageCard label="QnA" />
        <MyPageCard label="자유게시판" />
        <MyPageCard label="나눔" />
      </div>
    </div>
  );
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
