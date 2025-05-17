'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

import { usePopupStore } from '@/stores/usePopupStore';
import { CommunityCategory } from '@/types/community';
import { cn } from '@/utils/cn';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useCommunityMutation from '@apis/mutations/community/useCommunityMutation';
import postKeys from '@apis/queryKeys/postKeys';

import useOutsideClick from '@hooks/useOutsideClick';

export interface PostHeaderProps {
  userId: number;
  postId: number;
  category: CommunityCategory;
  title: string;
  userName: string;
  createdAt: string;
  isAuthor: boolean;
}

const PostHeader = ({
  userId,
  postId,
  category,
  title,
  userName,
  createdAt,
  isAuthor,
}: PostHeaderProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { deletePostMutation } = useCommunityMutation();

  const { ref } = useOutsideClick<HTMLDivElement>(() => setOpen(false));

  const [isOpen, setOpen] = useState(false);
  const handleMenuToggle = () => setOpen((prev) => !prev);

  const openPopup = usePopupStore((state) => state.openPopup);
  const handleDeletePopup = () => {
    handleMenuToggle();
    openPopup({
      title: '삭제하시겠습니까?',
      description: '삭제된 글은 복구할 수 없습니다',
      confirmText: '예',
      cancelText: '아니요',
      mode: 'double',
      onConfirm: () => {
        deletePostMutation.mutate(
          { userId, postId },
          {
            onError: (error) => {
              toast.error(error.response?.data.message);
            },
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: postKeys.postDetail(postId),
              });
              router.push('/community');
            },
          },
        );
      },
      onCancel: () => {},
    });
  };

  return (
    <header
      className={cn(
        'mb-8 flex w-full items-end justify-between gap-[3.1875rem] border-b-1 border-b-[#eee] pb-4',
        'md:mb-10 md:pb-[1.375rem]',
      )}
    >
      <div className={cn('flex flex-col')}>
        {/* type PC일 떄만 보임 */}
        <span className="md:text-tertiary font-NanumSquareRoundB hidden text-[1.125rem] leading-[1.222] md:block">
          {category}
        </span>
        <h1 className={cn('title2 mb-2 w-full break-all', 'md:mb-6')}>
          {title}
        </h1>
        <p className={cn('body1 mb-1 text-[#666]')}>{userName}</p>
        {/* ! data time 관련해서 포맷 수정 필요 */}
        <time
          dateTime={createdAt}
          className={cn('body2 leading-[0.875rem] text-[#999]')}
        >
          {createdAt}
        </time>
      </div>
      {isAuthor && (
        <div ref={ref} className="relative">
          <button
            className={cn('h-fit w-fit text-gray-500 hover:text-gray-700')}
            aria-label="게시물 설정 메뉴"
            aria-expanded={isOpen}
            onClick={handleMenuToggle}
          >
            <Image src="/icons/row_menu.svg" alt="" width={24} height={24} />
          </button>
          {isOpen && (
            <div
              role="menu"
              className="absolute right-0 w-[4.0625rem] rounded-[0.3125rem] bg-[#fff] py-[0.5rem] pl-[0.75rem] shadow-sm md:w-[6.25rem] md:px-[1.13rem] md:py-[0.75rem]"
            >
              <button
                className="body1 w-full text-left text-nowrap"
                onClick={handleDeletePopup}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default PostHeader;
