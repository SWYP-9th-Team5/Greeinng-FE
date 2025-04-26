'use client';

import { useRouter } from 'next/navigation';

import Button from '@components/common/Button';

export const tabList = [
  { href: '/community', name: '커뮤니티' },
  { href: '/mbti', name: '식물 MBTI' },
];

export function useNavigateToTabByName(name: string) {
  const router = useRouter();

  const handleNavigate = () => {
    const target = tabList.find((tab) => tab.name === name);
    if (target) {
      router.push(target.href);
    }
  };

  return handleNavigate;
}

export function CommunityButton() {
  const handleClick = useNavigateToTabByName('커뮤니티');

  return (
    <Button
      size="sm"
      color="gray"
      className="w-[5.625rem]"
      onClick={handleClick}
    >
      +더보기
    </Button>
  );
}

export function MbtiButton() {
  const handleClick = useNavigateToTabByName('식물 MBTI');

  return (
    <Button
      size="lg"
      color="secondary"
      className="w-[24.125rem]"
      onClick={handleClick}
    >
      테스트 시작하기
    </Button>
  );
}
