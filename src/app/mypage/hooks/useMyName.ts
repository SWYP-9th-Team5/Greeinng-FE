'use client';

import { useEffect, useState } from 'react';

import { fetchMyName } from '@apis/data/mypage';
import { NameItem } from '@apis/data/mypage';

export const useMyName = () => {
  const [nameData, setNameData] = useState<NameItem | null>(null);

  useEffect(() => {
    const getUsername = async () => {
      try {
        const { data } = await fetchMyName();
        setNameData(data);
      } catch (err) {
        console.error('이름 불러오기 실패:', err);
      }
    };
    getUsername();
  }, []);

  return nameData;
};
