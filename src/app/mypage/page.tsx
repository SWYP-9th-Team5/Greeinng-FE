'use client';

import React from 'react';

import Image from 'next/image';

import Pagination from '@components/features/All/Pagination';

const posts = [
  {
    category: 'QnA',
    title: '몬스테라 잎 끝이 갈색으로 변해요',
    likeCount: 8,
    commentCount: 16,
  },
  {
    category: '자유',
    title: '우리집 식물 이름 좀 알려주세요!',
    likeCount: 3,
    commentCount: 5,
  },
  {
    category: 'QnA',
    title: '해충이 생겼는데 어떻게 없애죠?',
    likeCount: 11,
    commentCount: 9,
  },
  {
    category: '나눔',
    title: '스투키 잘 키우실 분 드려요 (서울)',
    likeCount: 5,
    commentCount: 2,
  },
  {
    category: 'QnA',
    title: '잎이 노랗게 변해요. 이유가 뭘까요?',
    likeCount: 6,
    commentCount: 4,
  },
  {
    category: '자유',
    title: '식물 키우기 좋은 날씨네요 ☀️',
    likeCount: 2,
    commentCount: 0,
  },
  {
    category: '나눔',
    title: '화분 정리해요~ 관심 있으신 분!',
    likeCount: 10,
    commentCount: 7,
  },
];

const comment = [
  {
    category: 'QnA',
    title: '몬스테라 잎 끝이 갈색으로 변해요',
    createAt: '2025.04.15',
    comment:
      '혹시 그럼 어느정도로 줘야 적당할까요...? 일주일에 한 번이면 많은 편인가요?',
  },
  {
    category: '자유',
    title: '식물 키우기 입문자입니다. 물 주기 팁 있을까요?',
    createAt: '2025.04.22',
    comment: '저도 처음엔 헷갈렸는데 흙이 마르면 주는 게 가장 안전하더라고요!',
  },
  {
    category: '나눔',
    title: '스투키 분양해요 (서울 마포)',
    createAt: '2025.05.01',
    comment: '혹시 아직 가능할까요? 근처라 직접 수령 가능합니다!',
  },
  {
    category: 'QnA',
    title: '잎이 노랗게 변해요. 영양제 줘야 하나요?',
    createAt: '2025.05.10',
    comment: '광량 부족일 수도 있어요! 햇빛 잘 드는 창가로 옮겨보세요.',
  },
  {
    category: '자유',
    title: '반려식물 자랑합니다 🌿',
    createAt: '2025.05.20',
    comment: '진짜 예쁘네요! 저희 집 몬스테라는 요즘 통 안 커요ㅠ',
  },
];

const PCMypage = () => {
  const postcurrentPage = 1;
  const posttotalPages = 5;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const posthandlePageClick = (_page: number) => {};

  const commentcurrentPage = 1;
  const commenttotalPages = 5;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const commenthandlePageClick = (_page: number) => {};

  return (
    <div className="flex flex-col items-center pb-20">
      <div className="title2 mt-13 flex h-20 w-[75rem] items-center rounded-[20px] bg-[#FCFCFC] pl-10">
        아이디님
      </div>
      <div className="mt-5 flex flex-row">
        <div className="title2 flex h-[700px] w-[590px] flex-col overflow-y-auto rounded-[20px] bg-[#FCFCFC] pt-6 pl-8">
          <p className="mb-2">내가 쓴 글</p>
          {posts.map((post, _index) => (
            <div
              key={_index}
              className="relative mt-3 flex h-[61px] w-[542px] flex-row items-center rounded-[0.625rem] bg-[#F3F3F3] p-4"
            >
              <p className="subTitle text-tertiary mr-1">{post.category}</p>
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
          ))}
          <div className="mt-10">
            <Pagination
              currentPage={postcurrentPage}
              totalPages={posttotalPages}
              onPageClick={posthandlePageClick}
            />
          </div>
        </div>
        <div className="title2 ml-5 flex h-[700px] w-[590px] flex-col overflow-y-auto rounded-[20px] bg-[#FCFCFC] pt-6 pl-8">
          <p className="mb-2">내가 쓴 댓글</p>
          {comment.map((comment, _index) => (
            <div
              key={_index}
              className="relative mt-3 flex h-[102px] w-[542px] flex-col justify-center rounded-[0.94rem] bg-[#F3F3F3] p-4"
            >
              <div className="relative mb-3 flex flex-row">
                <p className="body2 text-tertiary mr-1">{comment.category}</p>
                <p className="body2 overflow-hidden break-words text-ellipsis whitespace-nowrap text-[#666]">
                  {comment.title}
                </p>
                <p className="body2 absolute right-0 text-[#999]">
                  {comment.createAt}
                </p>
              </div>
              <p className="body1 text-text2 overflow-hidden break-words text-ellipsis whitespace-nowrap">
                {comment.comment}
              </p>
            </div>
          ))}
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
