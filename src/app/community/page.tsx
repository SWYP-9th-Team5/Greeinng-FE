'use client';

import { CommunityHeader } from '@components/features/All/CommunityHeader';
import { TabComponent } from '@components/features/All/CommunityTabbar';
import { CommunityTable } from '@components/features/All/CommunityTable';

export default function CommunityPage() {
  return (
    <div className="flex flex-col px-5 pt-20 xl:px-32 xl:pt-12">
      {/*Community 글자와 글쓰기 버튼*/}
      <CommunityHeader />
      {/*카테고리 탭 바*/}
      <TabComponent />
      {/*커뮤니티 글 리스트 5개씩*/}
      <CommunityTable />
    </div>
  );
}
