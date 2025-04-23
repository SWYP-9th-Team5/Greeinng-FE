import React from 'react';

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default async function page({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;

  return (
    <>
      <p>question1</p>
      mbti {step}
    </>
  );
}
