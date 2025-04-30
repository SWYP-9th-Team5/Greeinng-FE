import { ReactNode } from 'react';

import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { UrlObject } from 'url';

import { QueryParams, calHref, getMbtiStepData } from '../../utils/utils';

interface AnswerCardItemProps {
  isMobile: boolean;
  type: string;
  src: string;
  questionText: string;
  href: UrlObject;
}

const AnswerCardItem = ({
  isMobile,
  type,
  src,
  questionText,
  href,
}: AnswerCardItemProps) => {
  return (
    <li className={cn(isMobile && 'max-xxs:w-[100%]')}>
      <Link
        className={cn(
          'bg-text relative flex border-2 border-[#eee] hover:bg-[#eee]',
          isMobile &&
            'max-xxs:w-[100%] w-[350px] rounded-[10px] px-[28px] py-[23px]',
          !isMobile && 'flex-col rounded-[20px] pr-[42px] pb-[23px] pl-[42px]',
        )}
        href={href}
      >
        <span
          className={cn(
            'font-HappinessB absolute text-sm font-black',
            isMobile && 'top-1/2 -translate-y-1/2',
            !isMobile && 'top-[181px] left-1/2 -translate-x-1/2',
          )}
        >
          {type}
        </span>
        <Image
          className={cn(isMobile && 'hidden', !isMobile && 'mb-[5px] block')}
          src={src}
          alt={`${type} 이미지`}
          width={197}
          height={197}
          priority
        />
        <p
          className={cn(
            'body1 w-full text-center whitespace-pre-line',
            isMobile && 'tracking-[-0.28px]',
            !isMobile && 'leading-[22px] md:tracking-[-0.32px]',
          )}
        >
          {questionText}
        </p>
      </Link>
    </li>
  );
};

const AnswerCardList = ({
  isMobile,
  children,
}: {
  isMobile: boolean;
  children: ReactNode;
}) => {
  return (
    <ul
      className={cn(
        isMobile && 'max-xxs:w-full flex flex-col items-center gap-4',
        !isMobile && 'flex flex-row justify-center md:gap-5',
      )}
    >
      {children}
    </ul>
  );
};

export default function Answer({
  isMobile,
  paramsQuery,
  numberStep,
}: {
  isMobile: boolean;
  paramsQuery: QueryParams;
  numberStep: number;
}) {
  const { answerList } = getMbtiStepData(numberStep);

  return (
    <AnswerCardList isMobile={isMobile}>
      {answerList.map((answerItem) => {
        const { type, src, questionText } = answerItem;

        const href = calHref(numberStep, paramsQuery, type);

        return (
          <AnswerCardItem
            isMobile={isMobile}
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
