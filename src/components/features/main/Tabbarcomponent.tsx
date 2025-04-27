'use client';

import { ReactNode, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
    <>
      <div className="block md:hidden">
        <MBCommunityGrid data={data} label={label} />
      </div>
      <div className="hidden md:block">
        <PCCommunityGrid data={data} label={label} />
      </div>
    </>
  );
}

function PCCommunityGrid({ data, label }: CommunityDataProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          onClick={() => router.push(`/community`)}
          className="bg-tertiary aspect-[387/202] max-w-[387px] cursor-pointer rounded-[1.25rem] p-4"
        >
          <p className="body2 text-[#eee]">{label}</p>
          <p className="subTitle text-text mb-4 overflow-hidden break-words text-ellipsis whitespace-nowrap">
            {item.title}
          </p>
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

function MBCommunityGrid({ data, label }: CommunityDataProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      {data.slice(0, 5).map((item) => (
        <div
          key={item.id}
          onClick={() => router.push(`/community`)}
          className="bg-tertiary aspect-[350/77] w-full max-w-[350px] rounded-[0.625rem] p-4"
        >
          <p className="body2 text-[#eee]">{label}</p>
          <div className="flex flex-row items-center justify-between">
            <p className="subTitle text-text overflow-hidden break-words text-ellipsis whitespace-nowrap">
              {item.title}
            </p>
            <div className="ml-2 flex flex-shrink-0 flex-row">
              <Image
                src="/icons/heart.svg"
                alt="좋아요 버튼"
                width={14}
                height={14}
                className="mr-1"
              />
              <p className="body1 text-text mr-3">{item.likecount}</p>
              <Image
                src="/icons/message.svg"
                alt="댓글 버튼"
                width={16}
                height={16}
                className="mr-1"
              />
              <p className="body1 text-text">{item.commentcount}</p>
            </div>
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
      title: '갑자기 잎이 다 떨어졌어요... 어떡하죠...',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 26,
      commentcount: 21,
    },
    {
      id: 2,
      title: '흙 위에 하얀 곰팡이처럼 뭐가 생겼어요ㅜㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 24,
      commentcount: 21,
    },
    {
      id: 3,
      title: '직광이 잘 드는 곳, 어떤 식물이 좋을까요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 20,
      commentcount: 21,
    },
    {
      id: 4,
      title: '새싹이 안 자라요ㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 18,
      commentcount: 21,
    },
    {
      id: 5,
      title: '분갈이 언제 해줘야 하나요?',
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
    <div className="flex w-full flex-col items-center">
      <div className="flex items-center justify-center gap-9">
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
      <div className="py-4">{renderContent()}</div>
    </div>
  );
};

export default TabComponent;
