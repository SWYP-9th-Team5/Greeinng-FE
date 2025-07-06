import { PostItem } from '@components/features/main/Community/MainTabbar';
import { CommentItem } from '@components/features/mypage/commentList';

import api from '@apis/api-config';

export interface NameItem {
  userId: number;
  userName: string;
}

export interface NameResponse {
  data: NameItem;
}

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

export const fetchMyName = async (): Promise<NameResponse> => {
  const res = await api.get<NameResponse>('/api/users/my');
  return res;
};

export const fetchPCMyPosts = async (page: number, pageSize = 7) => {
  const res = await api.get<CommunityResponse>('/api/posts/my', {
    params: {
      pageNumber: page,
      pageSize,
    },
  });
  return res;
};

export const fetchMBMyPosts = async (page: number, pageSize = 5) => {
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
