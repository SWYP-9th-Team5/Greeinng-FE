'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@components/common/Button';

const Share = () => {
  const [currentUrl, setCurrentUrl] = useState('');

  const handleCopyUrl = async (currentUrl: string) => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success('링크가 복사되었습니다.');
    } catch (error) {
      toast.error('링크 복사가 실패되었습니다.');
      console.error('링크 복사가 실패되었습니다.', error);
    }
  };

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className={cn('flex flex-col gap-1')}>
      <strong
        className={cn(
          'font-HappinessB text-[#666]',
          'mb-1 text-[0.875rem]',
          'md:mb-2 md:text-[1rem]',
        )}
      >
        링크 공유하기
      </strong>
      <div
        className={cn(
          'flex items-center justify-between gap-2 rounded-[0.625rem] border border-[#eee] bg-[#fff]',
          'px-3 py-[0.4375rem]',
        )}
      >
        <div className={cn('flex min-w-0 gap-2')}>
          <Image
            src="/icons/clip.svg"
            alt="copy icon"
            width={20}
            height={20}
            loading="lazy"
          />
          <p className={cn('body1 truncate text-[#666]')}>{currentUrl}</p>
        </div>
        <Button
          aria-label="결과 페이지 링크 복사"
          className={cn(
            'h-[34px] w-[76px] rounded-[5px] px-[12.5px]',
            'md:h-[38px] md:w-[89px] md:rounded-[10px]',
          )}
          color="gray"
          onClick={() => handleCopyUrl(currentUrl)}
        >
          복사하기
        </Button>
      </div>
    </div>
  );
};

const Nav = () => {
  const router = useRouter();

  const handleReTest = () => {
    router.push('/mbti');
  };

  const handleGoMainPage = () => {
    router.push('/');
  };

  return (
    <nav className={cn('flex flex-col', 'mb-8 gap-1', 'gap-3 md:mb-6')}>
      <Button
        className={cn('h-[38px]', 'md:h-[54px]')}
        color="secondary"
        onClick={handleReTest}
      >
        테스트 다시하기
      </Button>
      <Button
        className={cn('h-[38px]', 'md:h-[54px]')}
        color="point"
        onClick={handleGoMainPage}
      >
        메인화면으로
      </Button>
    </nav>
  );
};

export default function ResultButton() {
  return (
    <section className={cn('flex w-full flex-col')}>
      <Nav />
      <Share />
    </section>
  );
}
