import Image from 'next/image';

export const Nocontents = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center py-20 text-[#666]">
      <Image src="/icons/note_pc.svg" alt="글 없음" width={100} height={94} />
      <p className="subTitle mt-9">아직 게시글이 없어요</p>
      <p className="body1 mt-3">여러분의 이야기들을 공유 해주세요:)</p>
    </div>
  );
};
