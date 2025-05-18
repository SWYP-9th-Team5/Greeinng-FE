import api from '@apis/api-config';

export type PostUploadImageRes = {
  data: string[];
};

export const postUploadImage = async (formData: FormData) => {
  const res = await api.post<PostUploadImageRes>('/api/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export type PostUploadReq = {
  title: string;
  categoryId: 1 | 2 | 3;
  content: {
    type: string[];
    value: string[];
  };
};

export type PostUploadRes = {
  data: {
    postId: number;
  };
};

export const postUpload = async (body: PostUploadReq) => {
  const res = await api.post<PostUploadRes>('/api/posts', body);
  return res;
};

export type PostContentItem = {
  type: 'TEXT' | 'IMAGE';
  value: string;
};

export type PostDetailResponse = {
  commentCount: number;
  content: PostContentItem[];
  createdAt: string;
  isAuthor: boolean;
  isLike: boolean;
  likeCount: number;
  postId: number;
  categoryId: 1 | 2 | 3;
  title: string;
  userId: number;
  userName: string;
};

export const getPostDetail = async (postId: number) => {
  const res = await api.get<{ data: PostDetailResponse }>(
    `/api/posts/${postId}`,
  );
  return res.data;
};

export const postLike = async (userId: number, postId: number) => {
  await api.post(`/api/likes?userId=${userId}`, {
    postId,
  });
};

export type CommentItem = {
  commentId: number;
  comment: string;
  userId: number;
  userName: string;
  isWriter: boolean;
  createdAt: string;
};

export const getPostComments = async (postId: number) => {
  const res = await api.get<{ data: CommentItem[] }>(
    `/api/comments/posts/${postId}`,
    {
      params: {
        pageNumber: 1,
        pageSize: 100,
      },
    },
  );
  return res.data;
};

export type PostCommentReq = {
  userId: number;
  postId: number;
  comment: string;
};
export const postComments = async ({
  userId,
  postId,
  comment,
}: PostCommentReq) => {
  await api.post(`/api/comments?userId=${userId}`, {
    postId,
    comment,
  });
};

export type DeleteCommentReq = {
  userId: number;
  commentId: number;
};
export const deleteComment = async ({
  userId,
  commentId,
}: DeleteCommentReq) => {
  await api.delete(`/api/comments?userId=${userId}`, { data: { commentId } });
};

export type DeletePostReq = {
  userId: number;
  postId: number;
};
export const deletePost = async ({ userId, postId }: DeletePostReq) => {
  await api.delete(`/api/posts/${postId}?userId=${userId}`);
};
