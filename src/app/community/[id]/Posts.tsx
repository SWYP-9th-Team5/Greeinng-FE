'use client';

import { toast } from 'react-toastify';

import { calFormatToKoreanDate } from '@/utils/date';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import PostButton from '@components/features/community/detail/PostButton';
import PostCommentList from '@components/features/community/detail/PostCommentList';
import PostContent from '@components/features/community/detail/PostContent';
import PostHeader from '@components/features/community/detail/PostHeader';
import PostInput from '@components/features/community/detail/PostInput';

import { getPostComments, getPostDetail } from '@apis/data/community';
import useCommunityMutation from '@apis/mutations/community/useCommunityMutation';
import postKeys from '@apis/queryKeys/postKeys';

export default function Posts({ postNumberId }: { postNumberId: number }) {
  const { data } = useSuspenseQuery({
    queryKey: postKeys.postDetail(postNumberId),
    queryFn: () => getPostDetail(postNumberId),
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5,
  });

  const {
    commentCount,
    content,
    createdAt,
    isAuthor,
    isLike,
    likeCount,
    postId,
    title,
    userId,
    userName,
  } = data;
  const korCreateTime = calFormatToKoreanDate(createdAt);

  const { data: commentData } = useSuspenseQuery({
    queryKey: postKeys.postComments(postNumberId),
    queryFn: () => getPostComments(postNumberId),
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5,
  });

  const queryClient = useQueryClient();
  const { postLikeMutation, deleteCommentMutation } = useCommunityMutation();

  const handleToggleLike = () => {
    postLikeMutation.mutate(
      { userId, postId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: postKeys.postDetail(postId),
          });
        },
        onError: (error) => {
          console.log(error);
          toast.error(error.message);
        },
      },
    );
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(
      {
        userId,
        commentId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: postKeys.postComments(postId),
          });
          queryClient.invalidateQueries({
            queryKey: postKeys.postDetail(postId),
          });
        },
      },
    );
  };

  return (
    <>
      <PostHeader
        category={'QnA'}
        title={title}
        userName={userName}
        createdAt={korCreateTime}
        isAuthor={isAuthor}
      />
      {/* 커뮤닡티 본문 */}
      <PostContent content={content} />
      {/* 버튼 부분 */}
      <PostButton
        postId={postId}
        userId={userId}
        isLike={isLike}
        likeCount={likeCount}
        commentCount={commentCount}
        handleToggleLike={handleToggleLike}
      />
      {/* commentList */}
      <PostCommentList
        data={commentData}
        handleDeleteComment={handleDeleteComment}
      />
      {/* Input 등록 */}
      <PostInput userId={userId} postId={postId} />
    </>
  );
}
