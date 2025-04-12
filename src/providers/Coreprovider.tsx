import React from 'react';

import InteractiveViewProvider from './InteractiveViewProvider';
import QueryClientProviders from './QueryClientProvider';

export default function Coreprovider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QueryClientProviders />
      <InteractiveViewProvider>{children}</InteractiveViewProvider>
    </>
  );
}
