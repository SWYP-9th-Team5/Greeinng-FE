'use client';

import { SetStateAction, useState } from 'react';

import { usePopupStore } from '@/stores/usePopupStore';
import { cn } from '@/utils/cn';
import { useQueryClient } from '@tanstack/react-query';

import Button from '@components/common/Button';

import useCommunityMutation from '@apis/mutations/community/useCommunityMutation';
import postKeys from '@apis/queryKeys/postKeys';

import { useLoginErrorPopup } from '@hooks/useLoginErrorPopup';

interface PostInputProps {
  userId: number;
  postId: number;
}

export default function PostInput({ userId, postId }: PostInputProps) {
  const queryClient = useQueryClient();

  const [comment, setComment] = useState('');
  const isDisabledBtn = !comment;

  const onChange = (e: { target: { value: SetStateAction<string> } }) => {
    setComment(e.target.value);
  };

  // 추후 Hook으로 변경
  const onKeydown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const { postCommentsMutation } = useCommunityMutation();
  const { handleLoginPopup } = useLoginErrorPopup();

  const openPopup = usePopupStore((state) => state.openPopup);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isDisabledBtn) {
      openPopup({
        title: '댓글을 입력해 주세요',
        description:
          '댓글이 입력되지 않았습니다.\n댓글 입력 후 업로드 가능합니다.',
        confirmText: '확인',
        mode: 'single',
        onConfirm: () => {},
      });
      return;
    }

    postCommentsMutation.mutate(
      {
        userId,
        postId,
        comment,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: postKeys.postComments(postId),
          });
          queryClient.invalidateQueries({
            queryKey: postKeys.postDetail(postId),
          });
          setComment('');
        },
        onError: (error) => {
          console.error(error);
          if (error.status === 401) {
            handleLoginPopup();
          }
        },
      },
    );
  };

  return (
    <form
      className={cn(
        'flex h-[2.75rem] w-full items-center justify-between gap-2 rounded-[0.625rem] border border-[#ddd] bg-[#fff] px-3 py-[0.6875rem]',
        'md:h-24 md:items-start md:px-5 md:py-4',
      )}
      onSubmit={handleSubmit}
    >
      <label htmlFor="comment-input" className="sr-only">
        댓글을 입력하세요
      </label>
      {/* mobile */}
      <input
        className="font-HappinessR w-full min-w-0 text-[0.875rem] leading-[1.375] tracking-[-0.0175rem] text-[#333] placeholder-[#ddd] md:hidden"
        type="text"
        id="comment-input-mobile"
        name="comment"
        placeholder="댓글을 입력하세요"
        value={comment}
        onChange={onChange}
        onKeyDown={onKeydown}
      />
      {/* PC */}
      <textarea
        className={cn(
          'font-HappinessR hidden h-full w-full resize-none text-[1rem] leading-[1.375] tracking-[-0.0175rem] text-[#333] placeholder-[#ddd] md:block md:overflow-y-hidden',
        )}
        id="comment-input-desktop"
        name="comment"
        placeholder="댓글을 입력하세요"
        value={comment}
        onChange={onChange}
        onKeyDown={onKeydown}
      />
      <div className="flex shrink-0 md:h-full">
        <Button
          type="submit"
          color="secondary"
          size="sm"
          className="px-4 md:px-7"
          aria-label="댓글 등록하기"
        >
          등록
        </Button>
      </div>
    </form>
  );
}
