'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageClick,
}: PaginationProps) {
  const getPageItems = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter((page) => {
        return (
          page === 1 || //1번 페이지 항상 표시
          page === totalPages || //마지막 페이지 항상 표시
          Math.abs(page - currentPage) <= 1 //현재 페이지 +-1 표시
        );
      })
      .reduce<(number | string)[]>((acc, page) => {
        const prev = acc[acc.length - 1];
        if (typeof prev === 'number' && page - prev > 1) {
          //prev와 연속되지 않으면
          acc.push('...'); //생략 페이지
        }
        acc.push(page); //아니면 현재 페이지
        return acc;
      }, []);
  };

  return (
    <div className="mt-4 flex items-end justify-center gap-2">
      {getPageItems().map((item, i) =>
        item === '...' ? (
          <span key={`ellipsis-${i}`} className="text-text2">
            ...
          </span>
        ) : (
          <button
            key={`page-${item}`}
            onClick={() => onPageClick(Number(item))}
            className={`body1 h-8 w-8 rounded-[0.5rem] ${
              Number(item) === currentPage
                ? 'bg-primary text-text'
                : 'text-text2'
            }`}
          >
            {item}
          </button>
        ),
      )}
    </div>
  );
}
