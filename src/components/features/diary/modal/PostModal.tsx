'use client';

import FocusTrap from '@components/common/FocusTrap';

import DiaryModalHeader from './DiaryModalHeader';
import DiaryModalPost from './DiaryModalPost';
import DiaryModalRecord from './DiaryModalRecord';

export default function PostModal() {
  return (
    <section className="absolute inset-0 z-900 mx-auto p-[1rem]">
      <FocusTrap
        isAutoFocus={true}
        className="h-full max-w-full rounded-[1.25rem] bg-[#F5F4F0] p-[0.75rem] md:p-[2.25rem]"
      >
        <DiaryModalHeader />
        <div className="grid grid-cols-[15fr_auto_47fr]">
          <DiaryModalRecord />
          <div className="mx-[1.25rem] h-full w-[2px] bg-[#ccc]" />
          <DiaryModalPost />
        </div>
      </FocusTrap>
    </section>
  );
}
