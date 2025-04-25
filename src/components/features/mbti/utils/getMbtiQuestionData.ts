import { mobileMbtiData } from '@constants/mbtiData';

export type AnswerList = {
  type: string;
  src: string;
  questionText: string;
}[];

const calHref = (step: number) => {
  if (step === 3) return '/mbti/result';
  return step === 3 ? '/mbti/result' : `/mbti/question/${step + 1}`;
};

export function getMbtiStepData(step: number) {
  const item = mobileMbtiData[step - 1];
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

  const href = calHref(step);

  return { question, answerList, href };
}
