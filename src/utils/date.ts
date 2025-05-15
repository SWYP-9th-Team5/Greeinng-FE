/**
 * ISO 8601 형식의 날짜 문자열을 한국 표준시(KST) 기준의 YYYY-MM-DD 형식으로 변환합니다.
 *
 * @param {string} isoString - 변환할 ISO 형식의 날짜 문자열
 * @returns {string} 한국 시간 기준의 YYYY-MM-DD 형식 날짜 문자열
 */

export const calFormatToKoreanDate = (isoString: string): string => {
  const date = new Date(isoString);
  const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9

  const year = koreanTime.getFullYear();
  const month = String(koreanTime.getMonth() + 1).padStart(2, '0');
  const day = String(koreanTime.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
