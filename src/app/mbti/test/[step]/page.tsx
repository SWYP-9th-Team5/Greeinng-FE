import React from 'react';

import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';

import { pcMbtiData } from '@constants/mbtiData';

export function generateStaticParams() {
  return [{ step: '1' }, { step: '2' }, { step: '3' }];
}

export default async function page({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;

  const question = pcMbtiData[Number(step) - 1].question;

  const imageASrc = pcMbtiData[Number(step) - 1].imageA;
  const imageAAlt = pcMbtiData[Number(step) - 1].answerA;

  const imageBSrc = pcMbtiData[Number(step) - 1].imageB;
  const imageBAlt = pcMbtiData[Number(step) - 1].answerB;

  const answerList = [
    {
      src: imageASrc,
      alt: imageAAlt,
    },
    {
      src: imageBSrc,
      alt: imageBAlt,
    },
  ];

  return (
    <section
      className={cn(
        'title2 flex flex-col justify-center gap-13 text-center',
        'md:gap-26',
      )}
    >
      <p className={cn('')}>{question}</p>
      <ul className={cn('')}>
        {answerList.map((answerItem) => {
          const { src, alt } = answerItem;
          return (
            <li key={src}>
              <Link href={`/mbti/test/${Number(step) + 1}`}>
                <Image
                  className="w-full"
                  src={src}
                  alt={alt}
                  width={350}
                  height={350}
                />
                <p className="body1">{alt}</p>
              </Link>
            </li>
          );
        })}
        <li></li>
      </ul>
    </section>
  );
}
