import { ReactNode } from 'react';

import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';

const AnswerCardList = ({ children }: { children: ReactNode }) => {
  return (
    <ul className={cn('flex flex-col gap-4 md:flex-row md:gap-5')}>
      {children}
    </ul>
  );
};

const AnswerCardItem = ({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href: string;
}) => {
  return (
    <li>
      <Link href={href}>
        <span></span>
        <Image
          className="hidden w-full md:block"
          src={src}
          alt={alt}
          width={350}
          height={350}
        />
        <p className="body1">{alt}</p>
      </Link>
    </li>
  );
};

export default function Answer({
  href,
  answerList,
}: {
  href: string;
  answerList: { src: string; alt: string }[];
}) {
  return (
    <AnswerCardList>
      {answerList.map((answerItem) => {
        const { src, alt } = answerItem;
        return (
          <AnswerCardItem
            key={alt}
            src={src}
            alt={alt}
            href={`${href}?answer=${alt}`}
          />
        );
      })}
    </AnswerCardList>
  );
}
