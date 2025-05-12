import { cn } from '@/utils/cn';

import PostButton from '@components/features/community/detail/PostButton';
import PostCommentList from '@components/features/community/detail/PostCommentList';
import PostContent from '@components/features/community/detail/PostContent';
import PostHeader from '@components/features/community/detail/PostHeader';
import { PostHeaderProps } from '@components/features/community/detail/PostHeader/PostHeader';
import PostInput from '@components/features/community/detail/PostInput';

interface PageProps {
  params: Promise<{ id: string }>;
}

const data: PostHeaderProps = {
  category: 'QnA',
  title: '몬스테라 잎 끝이 갈색으로 변해요',
  userName: '초보 식집사',
  createdAt: '2025.04.15', // 임시 양식 미정
};

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}

export default async function Page({ params }: PageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = await params;
  const { title, category, userName, createdAt } = data;

  const articleClssName = cn(
    'm-auto flex flex-col items-center',
    // 작은 모바일
    'max-xxs:w-full',
    // 모바일
    'px-5 py-10 max-md:px-5',
    // PC
    'md:w-[45rem] md:pt-[4.375rem] md:pb-[3.25rem]',
  );

  // ! 임시 퍼블리싱 구조에 따라 변경 예정
  return (
    <article className={articleClssName}>
      <PostHeader
        category={category}
        title={title}
        userName={userName}
        createdAt={createdAt}
      />
      {/* 커뮤닡티 본문 */}
      <PostContent />
      {/* 버튼 부분 */}
      <PostButton />
      {/* commentList */}
      <PostCommentList />
      {/* Input 등록 */}
      <PostInput />
    </article>
  );
}
