import Button from '@components/common/Button';
import TabComponent from '@components/features/community/Tabbarcomponent';

export default function CommunityPage() {
  return (
    <div className="flex flex-col px-5 pt-20 xl:px-32 xl:pt-12">
      <div className="flex flex-row items-center justify-between pb-5">
        <p className="title1 text-primary">COMMUNITY</p>
        <Button size="sm" color="secondary" className="hidden md:block md:w-24">
          글쓰기
        </Button>
      </div>
      <TabComponent />
    </div>
  );
}
