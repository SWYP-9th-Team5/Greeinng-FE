import { calMbtiData } from './utils/utils';

export default function Question({
  isMobile,
  numberStep,
}: {
  isMobile: boolean;
  numberStep: number;
}) {
  const { question } = calMbtiData(numberStep, isMobile ? 'mobile' : 'pc');
  return <h2 className="title2 hidden text-center md:block">{question}</h2>;
}
