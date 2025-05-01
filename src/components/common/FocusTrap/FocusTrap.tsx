import React, { KeyboardEvent, ReactNode } from 'react';

import { useFocusTrap } from '@/hooks/useFocusTrap';
import { calGetFocusableElements } from '@/utils/accessibility';

export interface FocusTrapProps {
  children: ReactNode;
  isActive?: boolean;
  isAutoFocus?: boolean;
  isRestoreFocus?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement> | null;
  className?: string;
}

/**
 * @param children
 * 트랩 내부에 렌더링할 자식 컴포넌트
 * @param isActive
 * 포커스 트랩 활성화 결정하는 값
 * @param isAutoFocus
 * 포커스 트랩이 활성화될 때 자동으로 첫 번째 포커스 가능한 요소에 포커스를 설정할지 결정
 * @param isRestoreFocus
 * 포커스 트랩이 비활성화될 때, 이전에 포커스를 가졌던 요소로 복원할지 결정
 * @param initialFocusRef
 * 포커스 트랩이 활성화될 때, 해당 `ref`를 통해 지정된 요소에 초기 포커스를 설정
 * 기본값은 null, 기본 값일 경우 첫 번째 포커스 가능한 요소에 포커스가 설정
 * @param className
 * 클래스 네임
 */

export default function FocusTrap({
  children,
  isActive = true,
  isAutoFocus = true,
  isRestoreFocus = true,
  initialFocusRef = null,
  className = '',
}: FocusTrapProps) {
  const { containerRef } = useFocusTrap({
    isActive,
    isAutoFocus,
    isRestoreFocus,
    initialFocusRef,
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isActive || event.key !== 'Tab') return;

    const focusable = calGetFocusableElements(containerRef.current);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const current = document.activeElement;

    if (event.shiftKey && current === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && current === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={className}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
}
