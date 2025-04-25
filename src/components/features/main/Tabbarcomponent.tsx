'use client';

import { ReactNode, useState } from 'react';

import Image from 'next/image';

interface CommunityData {
  id: number;
  title: string;
  detail: string;
  likecount: number;
  commentcount: number;
}

interface CommunityDataProps {
  data: CommunityData[];
  label: string;
}

export function CommunityGrid({ data, label }: CommunityDataProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-tertiary aspect-[387/202] max-w-[387px] overflow-hidden rounded-[1.25rem] p-4"
        >
          <p className="body2 text-[#eee]">{label}</p>
          <p className="subTitle text-text mb-4 break-words">{item.title}</p>
          <p className="body1 text-text mb-4 break-words">{item.detail}</p>
          <div className="flex flex-row items-center">
            <Image
              src="/icons/heart.svg"
              alt="좋아요 버튼"
              width={18}
              height={18}
              className="mr-1"
            />
            <p className="body1 text-text mr-3">{item.likecount}</p>
            <Image
              src="/icons/message.svg"
              alt="댓글 버튼"
              width={18}
              height={18}
              className="mr-1"
            />
            <p className="body1 text-text">{item.commentcount}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState<string>('QnA');

  const tabs = ['QnA', '자유게시판', '나눔'];

  const QnA = [
    {
      id: 1,
      title: '동해물과 백두산이 마르고',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 26,
      commentcount: 21,
    },
    {
      id: 2,
      title: '동해물과 백두산이 마르고',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 24,
      commentcount: 21,
    },
    {
      id: 3,
      title: '동해물과 백두산이 마르고',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 20,
      commentcount: 21,
    },
    {
      id: 4,
      title: '동해물과 백두산이 마르고',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 18,
      commentcount: 21,
    },
    {
      id: 5,
      title: '동해물과 백두산이 마르고',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 15,
      commentcount: 21,
    },
    {
      id: 6,
      title: '동해물과 백두산이 마르고',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 10,
      commentcount: 21,
    },
  ];

  const Free = [
    {
      id: 1,
      title: '동해물과 백두산이 마르고2',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 26,
      commentcount: 21,
    },
    {
      id: 2,
      title: '동해물과 백두산이 마르고2',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 24,
      commentcount: 21,
    },
    {
      id: 3,
      title: '동해물과 백두산이 마르고2',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 20,
      commentcount: 21,
    },
    {
      id: 4,
      title: '동해물과 백두산이 마르고2',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 18,
      commentcount: 21,
    },
    {
      id: 5,
      title: '동해물과 백두산이 마르고2',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 15,
      commentcount: 21,
    },
    {
      id: 6,
      title: '동해물과 백두산이 마르고2',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 10,
      commentcount: 21,
    },
  ];

  const Gift = [
    {
      id: 1,
      title: '동해물과 백두산이 마르고3',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 26,
      commentcount: 21,
    },
    {
      id: 2,
      title: '동해물과 백두산이 마르고3',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 24,
      commentcount: 21,
    },
    {
      id: 3,
      title: '동해물과 백두산이 마르고3',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 20,
      commentcount: 21,
    },
    {
      id: 4,
      title: '동해물과 백두산이 마르고3',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 18,
      commentcount: 21,
    },
    {
      id: 5,
      title: '동해물과 백두산이 마르고3',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 15,
      commentcount: 21,
    },
    {
      id: 6,
      title: '동해물과 백두산이 마르고3',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 10,
      commentcount: 21,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'QnA':
        return <CommunityGrid data={QnA} label="QnA" />;

      case '자유게시판':
        return <CommunityGrid data={Free} label="자유게시판" />;
      case '나눔':
        return <CommunityGrid data={Gift} label="나눔" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex w-full items-center justify-center gap-9">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`title2 flex items-center justify-center text-center ${
              activeTab === tab ? 'text-secondary' : 'text-[#666]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4">{renderContent()}</div>
    </div>
  );
};

export default TabComponent;
