import { redirect } from 'next/navigation';

import Button from '@components/common/Button';

export function PCNoMyPlants() {
  return (
    <div className="flex h-[716px] w-[1200px] flex-col items-center justify-center bg-[url('/images/diary/enroll_note_pc.svg')] bg-contain bg-center bg-no-repeat pr-[580px]">
      <p className="subTitle text-text2 mb-5 text-center">
        아직 등록된 식물이 없어요
      </p>
      <p className="body1 mb-14 text-center text-[#666]">
        나의 식물을 등록하고
        <br />
        매일 성장하는 식물의 변화를 기록해 보세요
      </p>
      <Button
        color="secondary"
        size="md"
        className="w-[9.5rem]"
        onClick={() => redirect('/diary/newenroll')}
      >
        식물 등록하기
      </Button>
    </div>
  );
}
