import React from 'react';

const DiaryRecordLayout = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-[0.75rem] md:gap-[0.5rem]">
      <p className="subTitle">{label}</p>
      {children}
    </div>
  );
};

export default function DiaryModalRecord() {
  return (
    <div className="flex flex-col gap-[1.25rem] md:gap-[2.25rem]">
      <DiaryRecordLayout label="물 주기 스탬프">
        <div className="rounded-[0.625rem] bg-[#e9e9e9] py-[1.75rem] text-center text-[#999]">
          물 주고 스탬프 찍기
        </div>
      </DiaryRecordLayout>
      <DiaryRecordLayout label="오늘의 기록">
        <button className="rounded-[0.625rem] bg-[#e9e9e9] py-[0.75rem] text-center text-[#999]">
          + 기록하기
        </button>
      </DiaryRecordLayout>
    </div>
  );
}
