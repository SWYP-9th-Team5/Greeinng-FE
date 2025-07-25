import Image from 'next/image';

import { DiaryButton, MbtiButton } from '@components/features/main/Buttonlink';
import TabComponent from '@components/features/main/Community/MainTabbar';
import Imageslider from '@components/features/main/Imageslider/Imageslider';

const PCHome = () => {
  return (
    <div
      className="hide-scrollbar flex flex-col items-center justify-start overflow-x-scroll overflow-y-scroll"
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <div className="relative min-h-[600px] w-full">
        <Imageslider />
      </div>
      <div className="text-text2 bg-background relative flex min-h-[800px] w-full flex-col items-center justify-center">
        <p className="text-text2 title1 mb-7">COMMUNITY</p>
        <TabComponent />
      </div>
      <div className="flex w-full flex-row items-start justify-center">
        <div className="bg-background flex min-h-[700px] w-1/2 flex-col items-start justify-center pl-[6.5rem]">
          <p className="title1 text-text2 mb-6 text-left">식물 성장 일기</p>
          <p className="title2 mb-[3.75rem] text-left text-[#666]">
            나의 식물을 등록하고 하루하루 일기를 써보세요
            <br />
            식집사를 위한 식물 일기 서비스
          </p>
          <DiaryButton />
        </div>
        <div className="flex min-h-[700px] w-1/2 bg-[url('/images/main/main_diary_pc.svg')] bg-center bg-no-repeat" />
      </div>
      <div className="flex w-full flex-row items-start justify-center">
        <div className="flex min-h-[600px] w-1/2 bg-[#F5FFD0] bg-[url('/images/main/main_mbti_pc.png')] bg-contain bg-center bg-no-repeat" />
        <div className="bg-background flex min-h-[700px] w-1/2 flex-col items-start justify-center pl-[6.5rem]">
          <p className="title1 text-text2 mb-6 text-left">식물 MBTI</p>
          <p className="title2 mb-[3.75rem] text-left text-[#666]">
            내가 식물이라면? 나는 과연 어떤 유형의 식물일까
            <br />
            그리닝에서 알려드릴게요
          </p>
          <MbtiButton />
        </div>
      </div>
      <footer className="bg-primary flex min-h-[291px] w-full flex-col px-24 pt-10">
        <Image
          className="mb-7"
          src="/images/logo_white.png"
          alt="로고"
          width={168.8}
          height={40}
        />
        <div className="mb-2 flex w-full flex-row justify-between">
          <p className="caption text-text">Growing together with you</p>
          <p className="caption text-text">
            식물을 사랑하는 사람들의 커뮤니티 그리닝
          </p>
        </div>
        <div className="flex w-full flex-row justify-between">
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
      className="flex flex-col items-center justify-start"
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <div className="relative min-h-[540px] w-full">
        <Imageslider />
      </div>
      <div className="text-text2 bg-background flex min-h-[660px] w-full flex-col items-center justify-center">
        <p className="text-text2 title1 mb-7">COMMUNITY</p>
        <TabComponent />
      </div>
      <div className="flex min-h-[500px] w-full flex-col items-center bg-[#F5FFD0] pb-6 text-center">
        <p className="title1 text-text2 mt-6 mb-6">식물 성장 일기</p>
        <p className="title2 mb-auto text-[#666]">
          나의 식물을 등록하고
          <br />
          하루하루 일기를 써보세요
          <br />
          식집사를 위한 식물 일기 서비스
        </p>
        <Image
          className="mb-[26px] ml-8"
          src="/images/main/main_diary_mo.svg"
          alt="식물일기메인사진"
          width={340}
          height={213}
        />
        <DiaryButton />
      </div>
      <div className="bg-background flex min-h-[53px] w-full" />
      <div className="flex min-h-[500px] w-full flex-col items-center bg-[#F5FFD0] bg-[url('/images/main/main_mbti_mb.png')] bg-contain bg-center bg-no-repeat pb-6 text-center">
        <p className="title1 text-text2 mt-6 mb-6">식물 MBTI</p>
        <p className="title2 mb-auto text-[#666]">
          내가 식물이라면?
          <br />
          나는 과연 어떤 유형의 식물일까요?
          <br />
          그리닝에서 알려드릴게요
        </p>
        <MbtiButton />
      </div>
      <div className="bg-background flex min-h-[52px] w-full" />
      <footer className="bg-primary flex min-h-[164px] w-full flex-col pt-6 pl-6">
        <Image
          className="mb-3"
          src="/images/logo_white.png"
          alt="로고"
          width={80}
          height={19}
        />
        <p className="caption text-text mb-1">
          식물을 사랑하는 사람들의 커뮤니티 그리닝
        </p>
        <p className="caption text-text mb-1">SWYP Team Project / Team 5</p>
        <p className="caption text-text mb-1">Growing together with you</p>
        <p className="caption text-text">
          © 2025 Greening. All rights reserved.
        </p>
      </footer>
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
