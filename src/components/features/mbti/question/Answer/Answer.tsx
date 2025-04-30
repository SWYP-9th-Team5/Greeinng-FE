import { ReactNode } from 'react';

import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { UrlObject } from 'url';

import { QueryParams, calHref, getMbtiStepData } from '../../utils/utils';

const AnswerCardItem = ({
  type,
  src,
  questionText,
  href,
}: {
  type: string;
  src: string;
  questionText: string;
  href: UrlObject;
}) => {
  return (
    <li className={cn()}>
      <Link
        className={cn(
          'bg-text border-2',
          'max-xxs:w-full relative flex w-[350px] rounded-[10px] border-[#eee] px-[28px] py-[23px] hover:bg-[#eee]',
          'md:w-auto md:flex-col md:rounded-[20px] md:pt-0 md:pr-[42px] md:pb-[23px] md:pl-[42px]',
        )}
        href={href}
      >
        <span
          className={cn(
            'font-HappinessB text-sm font-black',
            'absolute top-1/2 -translate-y-1/2',
            'md:top-[181px] md:left-1/2 md:-translate-x-1/2',
          )}
        >
          {type}
        </span>
        <Image
          className={cn('hidden', 'md:mb-[5px] md:block')}
          src={src}
          alt={`${type} 이미지`}
          width={197}
          height={197}
          loading="lazy"
        />
        <p
          className={cn(
            'w-full',
            'body1 text-center tracking-[-0.28px] whitespace-pre-line',
            'md:leading-[22px] md:tracking-[-0.32px]',
          )}
        >
          {questionText}
        </p>
      </Link>
    </li>
  );
};

const AnswerCardList = ({ children }: { children: ReactNode }) => {
  return (
    <ul
      className={cn('flex flex-col items-center gap-4', 'md:flex-row md:gap-5')}
    >
      {children}
    </ul>
  );
};

export default function Answer({
  paramsQuery,
  numberStep,
}: {
  paramsQuery: QueryParams;
  numberStep: number;
}) {
  const { answerList } = getMbtiStepData(numberStep);

  return (
    <AnswerCardList>
      {answerList.map((answerItem) => {
        const { type, src, questionText } = answerItem;

        const href = calHref(numberStep, paramsQuery, type);

        return (
          <AnswerCardItem
            key={src}
            type={type}
            src={src}
            questionText={questionText}
            href={href}
          />
        );
      })}
    </AnswerCardList>
  );
}
