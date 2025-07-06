import { useEffect, useState } from 'react';

import type { PostItem } from '@components/features/main/Community/MainTabbar';

import { fetchMBMyPosts, fetchPCMyPosts } from '@apis/data/mypage';

export const useMyPosts = () => {
  const [postdata, setPostData] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const isMobile = window.innerWidth < 768;
        const res = isMobile
          ? await fetchMBMyPosts(currentPage)
          : await fetchPCMyPosts(currentPage);

        setPostData(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        console.error('커뮤니티 데이터 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return {
    postdata,
    isLoading,
    currentPage,
    totalPages,
    handlePageClick,
  };
};
