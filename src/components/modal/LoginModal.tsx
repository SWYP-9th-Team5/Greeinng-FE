'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@components/common/Button';
import FocusTrap from '@components/common/FocusTrap';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = async () => {
    //로그인하기 버튼 클릭시
    setIsLoading(true); //로딩중으로 변환
    try {
      router.push('/login'); //로그인으로 이동
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-999 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(51, 51, 51, 0.3)' }} //#333에 투명도 30%
      role="dialog"
      aria-modal="true"
    >
      <FocusTrap className="aspect-[320/173] max-w-[320px] rounded-[1.25rem] bg-[#FFF] p-[1.125rem] text-center md:aspect-[400/209] md:max-w-[400px] md:p-6">
        <p className="title2 text-text2 mb-4">로그인이 필요한 서비스입니다</p>
        <p className="subTitle text-[#666]">
          로그인 후 그리닝의 서비스를 이용해 보세요
        </p>
        <div className="mt-12 flex gap-2">
          <Button
            size="md"
            color="primary"
            isLoading={isLoading}
            onClick={handleLoginClick}
          >
            로그인하기
          </Button>
          <Button size="md" color="gray" onClick={onClose}>
            닫기
          </Button>
        </div>
      </FocusTrap>
    </div>
  );
}
