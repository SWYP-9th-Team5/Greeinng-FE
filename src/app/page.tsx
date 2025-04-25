import TabComponent from '@/components/features/main/Tabbarcomponent';

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
      <div className="text-text2 bg-background flex min-h-[600px] w-full flex-col items-center justify-center">
        <p className="text-text2 title1 mb-7">COMMUNITY</p>
        <TabComponent />
      </div>
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
