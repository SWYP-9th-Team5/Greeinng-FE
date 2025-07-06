import { useEffect, useState } from 'react';

import { CommentItem } from '@components/features/mypage/commentList';

import { fetchMyComments } from '@apis/data/mypage';

export const useMyComments = () => {
  const [commentdata, setCommentData] = useState<CommentItem[]>([]);
  const [iscoLoading, setIscoLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIscoLoading(true);
        const res = await fetchMyComments(currentPage);
        setCommentData(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        console.error('댓글 데이터 불러오기 실패:', err);
      } finally {
        setIscoLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return {
    commentdata,
    iscoLoading,
    currentPage,
    totalPages,
    handlePageClick,
  };
};
