//이미지 및 글자 뷰
interface MainSectionProps {
  bgColor: string;
  bgImageUrl: string;
  bgPosition: string;
  children?: React.ReactNode;
}

//PC 버전
export function PCMainSection({
  bgColor,
  bgImageUrl,
  bgPosition,
  children,
}: MainSectionProps) {
  return (
    <div
      className={`title1 text-primary relative flex min-h-[600px] w-full flex-col items-start justify-center ${bgColor} bg-contain ${bgPosition} bg-no-repeat pl-[clamp(1rem,5vw,8rem)]`}
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      {children}
    </div>
  );
}

//모바일 버전
export function MBMainSection({
  bgColor,
  bgImageUrl,
  bgPosition,
  children,
}: MainSectionProps) {
  return (
    <div
      className={`title1 text-primary relative flex min-h-[500px] w-full flex-col items-start justify-center ${bgColor} bg-cover ${bgPosition} pl-6`}
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      {children}
    </div>
  );
}
