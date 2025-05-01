import { UrlObject } from 'url';

import { MOBILE_MBTI_QUESTION_LIST } from '@constants/mbtiData';

export type QueryParams = {
  [key in 'answer1' | 'answer2' | 'answer3']: string;
};

export const calMbtiResult = (paramsQuery: QueryParams) => {
  const { answer1, answer2, answer3 } = paramsQuery;

  const ei = answer1 === 'A' ? 'E' : 'I';
  const sn = answer2 === 'A' ? 'N' : 'S';
  const tf = answer3 === 'A' ? 'T' : 'F';

  return `${ei}${sn}${tf}`;
};

export const calHref = (
  numberStep: number,
  paramsQuery: QueryParams,
  type: 'A' | 'B',
): UrlObject => {
  return {
    pathname: `/mbti/question/${numberStep + 1}`,
    query: {
      ...paramsQuery,
      [`answer${numberStep}`]: type,
    },
  };
};

export type AnswerList = {
  type: 'A' | 'B';
  src: string;
  questionText: string;
}[];

export function getMbtiStepData(step: number) {
  const item = MOBILE_MBTI_QUESTION_LIST[step - 1];
  const { question } = item;

  const answerList: AnswerList = [
    {
      type: 'A',
      src: item.aTypeSrc,
      questionText: item.aTypeAnswerText,
    },
    {
      type: 'B',
      src: item.bTypeSrc,
      questionText: item.bTypeAnswerText,
    },
  ];

  return { question, answerList };
}
