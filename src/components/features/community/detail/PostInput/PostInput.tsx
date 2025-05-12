'use client';

import { cn } from '@/utils/cn';

import Button from '@components/common/Button';

export default function PostInput() {
  return (
    <form
      className={cn(
        'flex h-[2.75rem] w-full items-center gap-2 rounded-[0.625rem] border border-[#ddd] bg-[#fff] px-3 py-[0.6875rem]',
        'md:h-24 md:items-start md:px-5 md:py-4',
      )}
    >
      <label htmlFor="comment-input" className="sr-only">
        댓글을 입력하세요
      </label>
      {/* mobile */}
      <input
        type="text"
        id="comment-input-mobile"
        name="comment"
        placeholder="댓글을 입력하세요"
        className="font-HappinessR flex-1 text-[0.875rem] leading-[1.375] tracking-[-0.0175rem] text-[#333] placeholder-[#ddd] md:hidden"
      />
      {/* PC */}
      <textarea
        id="comment-input-desktop"
        name="comment"
        placeholder="댓글을 입력하세요"
        className={cn(
          'font-HappinessR hidden h-full w-full resize-none text-[1rem] leading-[1.375] tracking-[-0.0175rem] text-[#333] placeholder-[#ddd] md:block',
        )}
      />
      <div className="flex md:h-full md:items-end">
        <Button
          type="submit"
          size="sm"
          className="px-4 md:px-7"
          aria-label="댓글 등록하기"
          onClick={() => {}}
        >
          등록
        </Button>
      </div>
    </form>
  );
}
