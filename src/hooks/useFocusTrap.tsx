import { useEffect, useRef } from 'react';

import { calGetFocusableElements } from '@/utils/accessibility';

import { FocusTrapProps } from '@components/common/FocusTrap/FocusTrap';

type UseFocusType = Omit<FocusTrapProps, 'children' | 'className'>;

/**
 * @param isActive
 * 포커스 트랩 활성화 결정하는 값
 * @param isAutoFocus
 * 포커스 트랩이 활성화될 때 자동으로 첫 번째 포커스 가능한 요소에 포커스를 설정할지 결정
 * @param isRestoreFocus
 * 포커스 트랩이 비활성화될 때, 이전에 포커스를 가졌던 요소로 복원할지 결정
 * @param initialFocusRef
 * 포커스 트랩이 활성화될 때, 해당 `ref`를 통해 지정된 요소에 초기 포커스를 설정
 * 기본값은 null, 기본 값일 경우 첫 번째 포커스 가능한 요소에 포커스가 설정
 */
export function useFocusTrap({
  isActive = true,
  isAutoFocus = true,
  isRestoreFocus = true,
  initialFocusRef = null,
}: UseFocusType) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // 이전 활성화된 요소를 기억 (언마운트 사용)
    previousActiveElement.current = document.activeElement as HTMLElement;

    const handleFocusTarget = () => {
      // 초기 포커스를 설정
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
        return;
      }

      // 자동 포커스 설정
      if (isAutoFocus && containerRef.current) {
        const focusable = calGetFocusableElements(containerRef.current);
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          containerRef.current.focus();
        }
      }
    };

    // 렌더링 후 포커스
    handleFocusTarget();

    // 언마운트 시 포커스 복원
    return () => {
      if (isRestoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive, isAutoFocus, isRestoreFocus, initialFocusRef]);

  return { containerRef };
}
