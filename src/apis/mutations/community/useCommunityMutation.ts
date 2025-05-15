import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ErrorResponse } from '@apis/api-config';
import {
  DeleteCommentReq,
  PostCommentReq,
  PostUploadImageRes,
  PostUploadReq,
  deleteComment,
  postComments,
  postLike,
  postUpload,
  postUploadImage,
} from '@apis/data/community';

export default function useCommunityMutation() {
  const postImageMutation = useMutation<
    PostUploadImageRes,
    AxiosError<ErrorResponse>,
    FormData
  >({
    mutationFn: (formData: FormData) => postUploadImage(formData),
  });

  const postMutation = useMutation<
    void,
    AxiosError<ErrorResponse>,
    PostUploadReq
  >({
    mutationFn: (body: PostUploadReq) => postUpload(body),
  });

  const postLikeMutation = useMutation<
    void,
    AxiosError<ErrorResponse>,
    { userId: number; postId: number }
  >({
    mutationFn: ({ userId, postId }) => postLike(userId, postId),
  });

  const postCommentsMutation = useMutation<
    void,
    AxiosError<ErrorResponse>,
    PostCommentReq
  >({
    mutationFn: ({ userId, postId, comment }) =>
      postComments({
        userId,
        postId,
        comment,
      }),
  });

  const deleteCommentMutation = useMutation<
    void,
    AxiosError<ErrorResponse>,
    DeleteCommentReq
  >({
    mutationFn: ({ userId, commentId }) => deleteComment({ userId, commentId }),
  });

  return {
    postImageMutation,
    postMutation,
    postLikeMutation,
    postCommentsMutation,
    deleteCommentMutation,
  };
}
