import { useDiaryModalStore } from '@/stores/useDiaryModalStore';
import { cn } from '@/utils/cn';
import Image from 'next/image';

import { TabValue } from './PostModal';

interface DiaryModalRecordsProps {
  title?: string;
  value: TabValue;
  handleWater: (isWater: boolean) => void;
  handlePost: (value: TabValue) => void;
}

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

export default function DiaryModalRecord({
  title,
  value,
  handleWater,
  handlePost,
}: DiaryModalRecordsProps) {
  const isWatering = useDiaryModalStore((state) => state.diaryState.isWatering);
  return (
    <div
      className={cn(
        'flex flex-col gap-[1.25rem] md:gap-[2.25rem]',
        ['content', 'post', 'modify'].includes(value) && 'hidden md:flex',
      )}
    >
      <DiaryRecordLayout label="물 주기 스탬프">
        <button
          onClick={() => handleWater(isWatering)}
          className="flex h-[4.75rem] items-center justify-center rounded-[0.625rem] bg-[#e9e9e9] text-[#999]"
        >
          {isWatering ? (
            <Image
              src="/icons/water.svg"
              alt="물 주기 완료 아이콘"
              width={36}
              height={36}
            />
          ) : (
            '물 주고 스탬프 찍기'
          )}
        </button>
      </DiaryRecordLayout>
      <DiaryRecordLayout label="오늘의 기록">
        {title && (
          <button
            onClick={() => handlePost('content')}
            className="flex overflow-hidden rounded-[0.625rem] bg-[#e9e9e9]"
          >
            <div className="bg-tertiary h-full w-[0.75rem]" />
            <span className="body1 py-[0.75rem] pl-[0.5rem] text-[#666]">
              {title}
            </span>
          </button>
        )}
        {!title && (
          <button
            onClick={() => handlePost('post')}
            className="rounded-[0.625rem] bg-[#e9e9e9] py-[0.75rem] text-center text-[#999]"
          >
            + 기록하기
          </button>
        )}
      </DiaryRecordLayout>
    </div>
  );
}
