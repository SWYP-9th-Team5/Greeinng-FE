'use client';

import { useEffect, useState } from 'react';

import api from '@apis/api-config';

import { CommunityList } from '../community/List';
import { Nocontents } from '../community/common/NoContents/NoContents';
import { PostItem } from '../main/Community/MainTabbar';

interface CommunityResponse {
  data: PostItem[];
  pagination: {
    totalCounts: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

const categoryMap: Record<string, string> = {
  qna: 'QnA',
  free: 'FREE_BULLETIN_BOARD',
  share: 'SHARING',
};

export const CommunityTable = ({ type }: { type: string }) => {
  const [data, setData] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await api.get<CommunityResponse>('/api/posts', {
          params: {
            category: categoryMap[type],
            pageNumber: currentPage,
            pageSize: 5, // 한 페이지 당 5개로 고정
          },
        });
        setData(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        console.error('커뮤니티 데이터 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  return (
    <>
      {isLoading ? (
        <p className="py-8 text-center">로딩 중...</p> // 데이터 로딩 화면
      ) : data.length === 0 ? (
        <Nocontents /> // 데이터 없을 때 화면
      ) : (
        <CommunityList
          data={data}
          type={type}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageClick={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
};
