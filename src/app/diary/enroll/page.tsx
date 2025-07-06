import React from 'react';

import Button from '@components/common/Button';

const PCHome = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-20">
      <div className="title1 text-text2 mt-14 mb-4 w-[1200px] text-start">
        식집사님의 기록
      </div>
      <div className="flex h-[716px] w-[1200px] flex-col items-center justify-center bg-[url('/images/diary/enroll_note_pc.svg')] bg-contain bg-center bg-no-repeat pr-[580px]">
        <p className="subTitle text-text2 mb-5 text-center">
          아직 등록된 식물이 없어요
        </p>
        <p className="body1 mb-14 text-center text-[#666]">
          나의 식물을 등록하고
          <br />
          매일 성장하는 식물의 변화를 기록해 보세요
        </p>
        <Button color="secondary" size="md" className="w-[9.5rem]">
          식물 등록하기
        </Button>
      </div>
    </div>
  );
};

const MBHome = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-20">
      <div className="title1 text-text2 mt-8 mb-3 w-full pl-6 text-start">
        식집사님의 기록
      </div>
      <div className="flex aspect-[390/1056] w-screen flex-col items-center justify-center bg-[url('/images/diary/enroll_note_mo.svg')] bg-contain bg-center bg-no-repeat pb-[550px]">
        <p className="subTitle text-text2 mb-5 text-center">
          아직 등록된 식물이 없어요
        </p>
        <p className="body1 mb-14 text-center text-[#666]">
          나의 식물을 등록하고
          <br />
          매일 성장하는 식물의 변화를 기록해 보세요
        </p>
        <Button color="secondary" size="md" className="w-[9.5rem]">
          식물 등록하기
        </Button>
      </div>
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
