'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import api from '@apis/api-config';

interface PostItem {
  postId: number;
  categoryId: number;
  userId: number;
  userName: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  lastModifiedAt: string;
  isLike: boolean;
}

const categoryMap: Record<string, number> = {
  QnA: 1,
  자유게시판: 2,
  나눔: 3,
};

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
          <p className="body1 text-text mb-4 line-clamp-3 break-words">
            {item.detail}
          </p>
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
  const [allData, setAllData] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const tabs = ['QnA', '자유게시판', '나눔'];

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await api.get<{ data: PostItem[] }>('/api/posts/home');
      setAllData(res.data);
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = allData.filter(
    (item) => item.categoryId === categoryMap[activeTab],
  );

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
      <div className="py-4">
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          <CommunityGrid
            data={filteredData.map((item) => ({
              id: item.postId,
              title: item.title,
              detail: item.content,
              likecount: item.likeCount,
              commentcount: item.commentCount,
            }))}
            label={activeTab}
          />
        )}
      </div>{' '}
    </div>
  );
};

export default TabComponent;
