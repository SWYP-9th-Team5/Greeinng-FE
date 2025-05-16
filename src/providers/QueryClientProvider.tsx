'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from '@apis/query-config';

export default function QueryClientProviders({
  children,
}: React.PropsWithChildren) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
