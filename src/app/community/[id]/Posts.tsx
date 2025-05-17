'use client';

import { usePopupStore } from '@/stores/usePopupStore';
import { calFormatToKoreanDate } from '@/utils/date';
import { useQueryClient, useSuspenseQueries } from '@tanstack/react-query';

import PostButton from '@components/features/community/detail/PostButton';
import PostCommentList from '@components/features/community/detail/PostCommentList';
import PostContent from '@components/features/community/detail/PostContent';
import PostHeader from '@components/features/community/detail/PostHeader';
import PostInput from '@components/features/community/detail/PostInput';

import { getPostComments, getPostDetail } from '@apis/data/community';
import useCommunityMutation from '@apis/mutations/community/useCommunityMutation';
import postKeys from '@apis/queryKeys/postKeys';

import { useLoginErrorPopup } from '@hooks/useLoginErrorPopup';

export default function Posts({ postNumberId }: { postNumberId: number }) {
  const fetchPostData = {
    queryKey: postKeys.postDetail(postNumberId),
    queryFn: () => getPostDetail(postNumberId),
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5,
  };

  const fetchPostCommentData = {
    queryKey: postKeys.postComments(postNumberId),
    queryFn: () => getPostComments(postNumberId),
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5,
  };

  const [postData, commentData] = useSuspenseQueries({
    queries: [fetchPostData, fetchPostCommentData],
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
  } = postData.data;
  const korCreateTime = calFormatToKoreanDate(createdAt);

  const queryClient = useQueryClient();
  const { postLikeMutation, deleteCommentMutation } = useCommunityMutation();
  const { handleLoginPopup } = useLoginErrorPopup();

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
          console.error(error);
          if (error.status === 401) {
            handleLoginPopup();
          }
        },
      },
    );
  };

  const openPopup = usePopupStore((state) => state.openPopup);
  const closePopup = usePopupStore((state) => state.closePopup);

  const handleDeleteComment = (commentId: number) => {
    openPopup({
      title: '삭제 하시겠습니까?',
      description: '삭제된 글은 복구할 수 없습니다',
      confirmText: '확인',
      cancelText: '아니요',
      mode: 'double',
      onConfirm: () => {
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
      },
      onCancel: () => closePopup(),
    });
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
        data={commentData.data}
        handleDeleteComment={handleDeleteComment}
      />
      {/* Input 등록 */}
      <PostInput userId={userId} postId={postId} />
    </>
  );
}
