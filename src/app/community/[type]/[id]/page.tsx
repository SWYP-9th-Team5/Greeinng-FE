import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { getPostComments, getPostDetail } from '@apis/data/community';
import postKeys from '@apis/queryKeys/postKeys';

import Posts from './Posts';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostRoute({ params }: PageProps) {
  const { id } = await params;
  const postNumberId = Number(id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: postKeys.postDetail(postNumberId),
    queryFn: () => getPostDetail(postNumberId),
  });

  await queryClient.prefetchQuery({
    queryKey: postKeys.postComments(postNumberId),
    queryFn: () => getPostComments(postNumberId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts postNumberId={postNumberId} />
    </HydrationBoundary>
  );
}
