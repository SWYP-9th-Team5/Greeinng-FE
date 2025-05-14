import { useTabStore } from '@/stores/useTabStore';

import { CommunityList } from '../community/List';

const dummyData = {
  QnA: [
    {
      id: 1,
      title:
        '갑자기 잎이 다 떨어졌어요... 어떡하죠..zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz.',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll 대한으로 길이 보전하세',
      likecount: 26,
      like: true,
      commentcount: 21,
    },
    {
      id: 2,
      title: '흙 위에 하얀 곰팡이처럼 뭐가 생겼어요ㅜㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 24,
      like: true,
      commentcount: 21,
    },
    {
      id: 3,
      title: '직광이 잘 드는 곳, 어떤 식물이 좋을까요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 20,
      like: false,
      commentcount: 21,
    },
    {
      id: 4,
      title: '새싹이 안 자라요ㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 18,
      like: false,
      commentcount: 21,
    },
    {
      id: 5,
      title: '분갈이 언제 해줘야 하나요?????????????????????????',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 15,
      like: false,
      commentcount: 21,
    },
  ],

  자유게시판: [
    {
      id: 1,
      title: '동해물과 백두산이 마르고2',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 26,
      like: false,
      commentcount: 21,
    },
    {
      id: 2,
      title: '동해물과 백두산이 마르고2',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 24,
      like: false,
      commentcount: 21,
    },
    {
      id: 3,
      title:
        '동해물과 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss마르고2',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 20,
      like: true,
      commentcount: 21,
    },
    {
      id: 4,
      title: '동해물과 백두산이 마르고2',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 18,
      like: false,
      commentcount: 21,
    },
    {
      id: 5,
      title: '동해물과 백두산이 마르고2',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 15,
      like: false,
      commentcount: 21,
    },
  ],

  나눔: [
    {
      id: 1,
      title: '동해물과 백두산이 마르고3',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 26,
      like: false,
      commentcount: 21,
    },
    {
      id: 2,
      title: '동해물과 백두산이 마르고3',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 24,
      like: false,
      commentcount: 21,
    },
    {
      id: 3,
      title: '동해물과 백두산이 마르고3',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 20,
      like: false,
      commentcount: 21,
    },
    {
      id: 4,
      title: '동해물과 백두산이 마르고3',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 18,
      like: true,
      commentcount: 21,
    },
  ],
};

export const CommunityTable = () => {
  const { activeTab } = useTabStore();
  const data = dummyData[activeTab as keyof typeof dummyData];

  return <CommunityList data={data} label={activeTab} />;
};
