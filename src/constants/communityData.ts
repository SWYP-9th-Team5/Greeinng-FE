import { CommunityCategory } from '@/types/community';

export const COMMUNITY_LIST = [
  { path: 'qna', value: '1', label: 'QnA' },
  { path: 'free', value: '2', label: '자유게시판' },
  { path: 'share', value: '3', label: '나눔' },
];

export const CATEGORY_ID_NAME_MAP: Record<number, CommunityCategory> = {
  1: 'QnA',
  2: '자유게시판',
  3: '나눔',
};
