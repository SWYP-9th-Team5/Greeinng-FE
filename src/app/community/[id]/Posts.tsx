'use client';

import { calFormatToKoreanDate } from '@/utils/date';
import { useSuspenseQueries } from '@tanstack/react-query';

import PostButton from '@components/features/community/detail/PostButton';
import PostCommentList from '@components/features/community/detail/PostCommentList';
import PostContent from '@components/features/community/detail/PostContent';
import PostHeader from '@components/features/community/detail/PostHeader';
import PostInput from '@components/features/community/detail/PostInput';

import { getPostComments, getPostDetail } from '@apis/data/community';
import postKeys from '@apis/queryKeys/postKeys';

import usePostActions from './hooks/usePostActions';

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

  const { handleToggleLike, handleDeleteComment } = usePostActions(
    userId,
    postId,
  );

  return (
    <>
      <PostHeader
        userId={userId}
        postId={postId}
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
