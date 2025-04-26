import TabComponent from '@/components/features/main/Tabbarcomponent';
import Image from 'next/image';

import {
  CommunityButton,
  MbtiButton,
} from '@components/features/main/Buttonlink';

const PCHome = () => {
  return (
    <div
      className="flex flex-col items-center justify-start overflow-x-hidden"
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <div className="title1 text-text2 flex min-h-[600px] w-full flex-col items-start justify-center bg-[#e9e9e9]">
        식물을 키우는 모든 순간
        <br />
        플랫폼에서
      </div>
      <div className="text-text2 bg-background flex min-h-[800px] w-full flex-col items-center justify-center">
        <p className="text-text2 title1 mb-7">COMMUNITY</p>
        <TabComponent />
        <CommunityButton />
      </div>
      <div className="flex w-full flex-row items-start justify-center">
        <div className="flex min-h-[600px] w-1/2 bg-[#e9e9e9]"></div>
        <div className="bg-background flex min-h-[700px] w-1/2 flex-col items-start justify-center pl-[6.5rem]">
          <p className="title1 text-text2 mb-6 text-left">식물 MBTI</p>
          <p className="title2 mb-[3.75rem] text-left text-[#666]">
            내가 식물이라면? 나는 과연 어떤 유형의 식물일까
            <br />
            Greening에서 알려드릴게요
          </p>
          <MbtiButton />
        </div>
      </div>
      <footer className="bg-primary flex min-h-[291px] w-full flex-col pt-10 pl-24">
        <Image
          className="mb-7"
          src="/images/logo_white.png"
          alt="로고"
          width={168.8}
          height={40}
        />
        <div className="mb-2 flex max-w-[1200px] flex-row justify-between">
          <p className="caption text-text">Growing together with you</p>
          <p className="caption text-text">
            식물을 사랑하는 사람들의 커뮤니티 그리닝
          </p>
        </div>
        <div className="flex max-w-[1200px] flex-row justify-between">
          <p className="caption text-text">
            © 2025 Greening. All rights reserved.
          </p>
          <p className="caption text-text">SWYP Team Project / Team 5</p>
        </div>
      </footer>
    </div>
  );
};
const MBHome = () => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: 'calc(100vh - 80px)' }}
    >
      main
    </div>
  );
};

export default function Home() {
  return (
    <>
      <div className="block md:hidden">
        <MBHome />
      </div>
      <div className="hidden md:block">
        <PCHome />
      </div>
    </>
  );
}
