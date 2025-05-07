import { useEffect, useState } from 'react';

export function usePagination<T>(data: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  //데이터 바뀌면 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    currentItems,
    totalPages,
    handlePageClick,
  };
}
