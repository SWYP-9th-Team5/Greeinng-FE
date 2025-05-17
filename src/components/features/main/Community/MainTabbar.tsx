'use client';

import { useEffect, useState } from 'react';

import api from '@/apis/api-config';

import { CommunityGrid } from './CommunityGrid';

export interface PostItem {
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
      <div className="mb-2 flex items-center justify-center gap-9">
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
      <div className="h-[60vh] py-4">
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          <CommunityGrid data={filteredData} label={activeTab} />
        )}
      </div>
    </div>
  );
};

export default TabComponent;
