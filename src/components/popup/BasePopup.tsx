'use client';

import { cn } from '@/utils/cn';

import Button from '@components/common/Button';
import FocusTrap from '@components/common/FocusTrap';

interface BasePopupProps {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void; //single mode에서는 사용 x
  isLoading?: boolean;
  className?: string;
  mode?: 'single' | 'double'; // 버튼 개수가 하나면 single, 두 개면 double
}

export default function BasePopup({
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  className,
  mode = 'double',
}: BasePopupProps) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(51, 51, 51, 0.3)' }} //#333에 투명도 30%
      role="dialog"
      aria-modal="true"
    >
      <FocusTrap
        isActive={true}
        isAutoFocus={false}
        isRestoreFocus={true}
        className={cn(
          'aspect-[320/173] w-[320px] max-w-[320px] rounded-[1.25rem] bg-[#FFF] p-[1.125rem] text-center md:aspect-[400/209] md:w-[400px] md:max-w-[400px] md:p-6',
          className,
        )}
      >
        <p className="title2 text-text2 mb-4">{title}</p>
        {description && (
          <p className="subTitle indent-4 whitespace-pre-line text-[#666]">
            {description}
          </p>
        )}

        <div className="mt-12 flex justify-center gap-2">
          <Button
            size="md"
            color="primary"
            onClick={onConfirm}
            className={mode === 'single' ? 'w-[120px]' : ''}
          >
            {confirmText}
          </Button>
          {mode !== 'single' && onCancel && (
            <Button size="md" color="gray" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
        </div>
      </FocusTrap>
    </div>
  );
}
