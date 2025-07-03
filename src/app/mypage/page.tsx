'use client';

import React from 'react';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import Pagination from '@components/features/All/Pagination';
import { PostItem } from '@components/features/main/Community/MainTabbar';

import api from '@apis/api-config';

import { CATEGORY_ID_NAME_MAP } from '@constants/communityData';

interface CommunityResponse {
  data: PostItem[];
  pagination: {
    totalCounts: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

interface CommentResponse {
  data: CommentItem[];
  pagination: {
    totalCounts: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export interface CommentItem {
  postId: number;
  categoryId: number;
  commentId: number;
  comment: string;
  postTitle: string;
  createdAt: string;
  lastModifiedAt: string;
}

const PCMypage = () => {
  const [postdata, setPostData] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postcurrentPage, setPostCurrentPage] = useState(1);
  const [posttotalPages, setPostTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await api.get<CommunityResponse>('/api/posts/my', {
          params: {
            pageNumber: postcurrentPage,
            pageSize: 7, // 한 페이지 당 5개로 고정
          },
        });
        setPostData(res.data);
        setPostTotalPages(res.pagination.totalPages);
      } catch (err) {
        console.error('커뮤니티 데이터 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [postcurrentPage]);
  const posthandlePageClick = (page: number) => {
    setPostCurrentPage(page);
  };

  const [commentdata, setCommentData] = useState<CommentItem[]>([]);
  const [iscLoading, setcIsLoading] = useState<boolean>(false);
  const [commentcurrentPage, setCommentCurrentPage] = useState(1);
  const [commenttotalPages, setCommentTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setcIsLoading(true);
        const res = await api.get<CommentResponse>('/api/comments/my', {
          params: {
            pageNumber: postcurrentPage,
            pageSize: 5, // 한 페이지 당 5개로 고정
          },
        });
        setCommentData(res.data);
        setCommentTotalPages(res.pagination.totalPages);
      } catch (err) {
        console.error('커뮤니티 데이터 불러오기 실패:', err);
      } finally {
        setcIsLoading(false);
      }
    };
    fetchData();
  }, [commentcurrentPage]);
  const commenthandlePageClick = (page: number) => {
    setCommentCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center pb-20">
      <div className="title2 mt-13 flex h-20 w-[75rem] items-center rounded-[20px] bg-[#FCFCFC] pl-10">
        아이디님
      </div>
      <div className="mt-5 flex flex-row">
        <div className="title2 flex h-[700px] w-[590px] flex-col overflow-y-auto rounded-[20px] bg-[#FCFCFC] pt-6 pl-8">
          <p className="mb-2">내가 쓴 글</p>
          <div className="h-[575px]">
            {isLoading ? (
              <p>로딩 중...</p>
            ) : (
              postdata.map((post, index) => {
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
              })
            )}
          </div>
          <Pagination
            currentPage={postcurrentPage}
            totalPages={posttotalPages}
            onPageClick={posthandlePageClick}
          />
        </div>
        <div className="title2 ml-5 flex h-[700px] w-[590px] flex-col overflow-y-auto rounded-[20px] bg-[#FCFCFC] pt-6 pl-8">
          <p className="mb-2">내가 쓴 댓글</p>
          <div className="h-[572px]">
            {iscLoading ? (
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
