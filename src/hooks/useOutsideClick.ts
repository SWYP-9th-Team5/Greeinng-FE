'use client';

import { useEffect, useRef } from 'react';

/**
 * 사용자가 지정된 요소 밖을 클릭했을 때 실행될 콜백을 처리하는 훅.
 *
 * @param fn 클릭이 요소 밖에서 발생했을 때 실행할 콜백 함수
 * @returns ref - 클릭 이벤트를 감지할 DOM 요소에 참조를 설정할 수 있는 ref 객체
 */
const useOutsideClick = <T extends HTMLElement>(fn: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        fn();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [fn]);

  return { ref };
};

export default useOutsideClick;
