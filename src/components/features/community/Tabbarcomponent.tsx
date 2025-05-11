'use client';

import { useState } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';

import Button from '@components/common/Button';
import BaseModal from '@components/modal/BaseModal';

import { CommunityList } from './List';

const TabComponent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('QnA');
  const { isLoggedIn } = useAuthStore();
  const [showModal, setShowModal] = useState(false);

  const handleWrite = () => {
    if (isLoggedIn) {
      router.push('/story');
    } else {
      setShowModal(true);
    }
  };
  const tabs = ['QnA', '자유게시판', '나눔'];

  const QnA = [
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
    {
      id: 6,
      title: '갑자기 잎이 다 떨어졌어요... 어떡하죠...',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll 대한으로 길이 보전하세',
      likecount: 26,
      like: false,
      commentcount: 21,
    },
    {
      id: 7,
      title: '흙 위에 하얀 곰팡이처럼 뭐가 생겼어요ㅜㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 24,
      like: false,
      commentcount: 21,
    },
    {
      id: 8,
      title: '직광이 잘 드는 곳, 어떤 식물이 좋을까요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 20,
      like: false,
      commentcount: 21,
    },
    {
      id: 9,
      title: '새싹이 안 자라요ㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 18,
      like: false,
      commentcount: 21,
    },
    {
      id: 10,
      title: '분갈이 언제 해줘야 하나요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 15,
      like: false,
      commentcount: 21,
    },
    {
      id: 11,
      title: '갑자기 잎이 다 떨어졌어요... 어떡하죠...',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll 대한으로 길이 보전하세',
      likecount: 26,
      like: false,
      commentcount: 21,
    },
    {
      id: 12,
      title: '흙 위에 하얀 곰팡이처럼 뭐가 생겼어요ㅜㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 24,
      like: false,
      commentcount: 21,
    },
    {
      id: 13,
      title: '직광이 잘 드는 곳, 어떤 식물이 좋을까요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 20,
      like: false,
      commentcount: 21,
    },
    {
      id: 14,
      title: '새싹이 안 자라요ㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 18,
      like: false,
      commentcount: 21,
    },
    {
      id: 15,
      title: '분갈이 언제 해줘야 하나요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 15,
      like: false,
      commentcount: 21,
    },
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
    {
      id: 6,
      title: '갑자기 잎이 다 떨어졌어요... 어떡하죠...',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll 대한으로 길이 보전하세',
      likecount: 26,
      like: false,
      commentcount: 21,
    },
    {
      id: 7,
      title: '흙 위에 하얀 곰팡이처럼 뭐가 생겼어요ㅜㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 24,
      like: false,
      commentcount: 21,
    },
    {
      id: 8,
      title: '직광이 잘 드는 곳, 어떤 식물이 좋을까요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 20,
      like: false,
      commentcount: 21,
    },
    {
      id: 9,
      title: '새싹이 안 자라요ㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 18,
      like: false,
      commentcount: 21,
    },
    {
      id: 10,
      title: '분갈이 언제 해줘야 하나요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 15,
      like: false,
      commentcount: 21,
    },
    {
      id: 11,
      title: '갑자기 잎이 다 떨어졌어요... 어떡하죠...',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll 대한으로 길이 보전하세',
      likecount: 26,
      like: false,
      commentcount: 21,
    },
    {
      id: 12,
      title: '흙 위에 하얀 곰팡이처럼 뭐가 생겼어요ㅜㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 24,
      like: false,
      commentcount: 21,
    },
    {
      id: 13,
      title: '직광이 잘 드는 곳, 어떤 식물이 좋을까요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 20,
      like: false,
      commentcount: 21,
    },
    {
      id: 14,
      title: '새싹이 안 자라요ㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 18,
      like: false,
      commentcount: 21,
    },
    {
      id: 15,
      title: '분갈이 언제 해줘야 하나요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 15,
      like: false,
      commentcount: 21,
    },
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
    {
      id: 6,
      title: '갑자기 잎이 다 떨어졌어요... 어떡하죠...',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll 대한으로 길이 보전하세',
      likecount: 26,
      like: false,
      commentcount: 21,
    },
    {
      id: 7,
      title: '흙 위에 하얀 곰팡이처럼 뭐가 생겼어요ㅜㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 24,
      like: false,
      commentcount: 21,
    },
    {
      id: 8,
      title: '직광이 잘 드는 곳, 어떤 식물이 좋을까요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 20,
      like: false,
      commentcount: 21,
    },
    {
      id: 9,
      title: '새싹이 안 자라요ㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 18,
      like: false,
      commentcount: 21,
    },
    {
      id: 10,
      title: '분갈이 언제 해줘야 하나요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 15,
      like: false,
      commentcount: 21,
    },
    {
      id: 11,
      title: '갑자기 잎이 다 떨어졌어요... 어떡하죠...',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll 대한으로 길이 보전하세',
      likecount: 26,
      like: false,
      commentcount: 21,
    },
    {
      id: 12,
      title: '흙 위에 하얀 곰팡이처럼 뭐가 생겼어요ㅜㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 24,
      like: false,
      commentcount: 21,
    },
    {
      id: 13,
      title: '직광이 잘 드는 곳, 어떤 식물이 좋을까요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 20,
      like: false,
      commentcount: 21,
    },
    {
      id: 14,
      title: '새싹이 안 자라요ㅜ',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 18,
      like: false,
      commentcount: 21,
    },
    {
      id: 15,
      title: '분갈이 언제 해줘야 하나요?',
      detail:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세',
      likecount: 15,
      like: false,
      commentcount: 21,
    },
  ];

  const Free = [
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
  ];

  const Gift = [
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
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'QnA':
        return <CommunityList key="QnA" data={QnA} label="QnA" />;
      case '자유게시판':
        return <CommunityList key="Free" data={Free} label="자유게시판" />;
      case '나눔':
        return <CommunityList key="Gift" data={Gift} label="나눔" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`title2 inline-flex items-center pb-1 text-center whitespace-nowrap ${activeTab === tab ? 'text-secondary border-secondary border-b-2' : 'text-[#666]'} `}
            >
              {tab}
            </button>
          ))}
        </div>
        <Button
          size="sm"
          color="secondary"
          className="block w-14 border border-red-500 md:hidden"
          onClick={handleWrite}
        >
          글쓰기
        </Button>
        {/* 로그인 모달 */}
        {showModal && (
          <BaseModal
            title="로그인이 필요한 서비스입니다"
            description="로그인 후 그리닝의 서비스를 이용해 보세요"
            confirmText="로그인하기"
            cancelText="닫기"
            onConfirm={() => router.push('/login')}
            onCancel={() => setShowModal(false)}
          />
        )}{' '}
      </div>
      <div className="w-full py-4">{renderContent()}</div>
    </div>
  );
};

export default TabComponent;
