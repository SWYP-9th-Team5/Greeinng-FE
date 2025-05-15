export const calFormatToKoreanDate = (isoString: string): string => {
  const date = new Date(isoString);
  const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9

  const year = koreanTime.getFullYear();
  const month = String(koreanTime.getMonth() + 1).padStart(2, '0');
  const day = String(koreanTime.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
