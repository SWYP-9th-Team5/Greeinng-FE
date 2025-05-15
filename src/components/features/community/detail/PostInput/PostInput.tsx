'use client';

import { SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

import { cn } from '@/utils/cn';
import { useQueryClient } from '@tanstack/react-query';

import Button from '@components/common/Button';

import useCommunityMutation from '@apis/mutations/community/useCommunityMutation';
import postKeys from '@apis/queryKeys/postKeys';

interface PostInputProps {
  userId: number;
  postId: number;
}

export default function PostInput({ userId, postId }: PostInputProps) {
  const queryClient = useQueryClient();

  const [comment, setComment] = useState('');

  const onChange = (e: { target: { value: SetStateAction<string> } }) => {
    setComment(e.target.value);
  };

  const { postCommentsMutation } = useCommunityMutation();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
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
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <form
      className={cn(
        'flex h-[2.75rem] w-full items-center gap-2 rounded-[0.625rem] border border-[#ddd] bg-[#fff] px-3 py-[0.6875rem]',
        'md:h-24 md:items-start md:px-5 md:py-4',
      )}
      onSubmit={handleSubmit}
    >
      <label htmlFor="comment-input" className="sr-only">
        댓글을 입력하세요
      </label>
      {/* mobile */}
      <input
        className="font-HappinessR flex-1 text-[0.875rem] leading-[1.375] tracking-[-0.0175rem] text-[#333] placeholder-[#ddd] md:hidden"
        type="text"
        id="comment-input-mobile"
        name="comment"
        placeholder="댓글을 입력하세요"
        value={comment}
        onChange={onChange}
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
      />
      <div className="flex md:h-full md:items-end">
        <Button
          type="submit"
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
