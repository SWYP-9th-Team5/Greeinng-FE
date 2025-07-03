import { PostItem } from '@components/features/main/Community/MainTabbar';
import { CommentItem } from '@components/features/mypage/commentList';

import api from '@apis/api-config';

export interface CommunityResponse {
  data: PostItem[];
  pagination: {
    totalCounts: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export interface CommentResponse {
  data: CommentItem[];
  pagination: {
    totalCounts: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export const fetchMyPosts = async (page: number, pageSize = 7) => {
  const res = await api.get<CommunityResponse>('/api/posts/my', {
    params: {
      pageNumber: page,
      pageSize,
    },
  });
  return res;
};

export const fetchMyComments = async (page: number, pageSize = 5) => {
  const res = await api.get<CommentResponse>('/api/comments/my', {
    params: {
      pageNumber: page,
      pageSize,
    },
  });
  return res;
};
