'use client';

import { usePopupStore } from '@/stores/usePopupStore';
import { cn } from '@/utils/cn';

import Button from '@components/common/Button';
import FocusTrap from '@components/common/FocusTrap';

export default function Popup() {
  const {
    isOpen,
    title,
    description,
    confirmText,
    cancelText,
    mode = 'double',
    className,
    onConfirm,
    onCancel,
    closePopup,
  } = usePopupStore();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(51, 51, 51, 0.3)' }}
      role="dialog"
      aria-modal="true"
    >
      <FocusTrap
        isActive={isOpen}
        isRestoreFocus
        className={cn(
          'h-[27vh] w-[320px] rounded-[1.25rem] bg-[#FFF] p-4 text-center md:aspect-[400/209] md:w-[400px] md:max-w-[400px] md:p-6',
          className,
        )}
      >
        <p className="title2 text-text2 mb-4">{title}</p>
        {description && (
          <p className="subTitle whitespace-pre-line text-[#666]">
            {description}
          </p>
        )}

        <div className="mt-12 flex justify-center gap-2">
          <Button
            size="md"
            color="primary"
            onClick={() => {
              onConfirm();
              closePopup();
            }}
            className={mode === 'single' ? 'w-[120px]' : ''}
          >
            {confirmText}
          </Button>
          {mode !== 'single' && onCancel && (
            <Button
              size="md"
              color="gray"
              onClick={() => {
                onCancel();
                closePopup();
              }}
            >
              {cancelText}
            </Button>
          )}
        </div>
      </FocusTrap>
    </div>
  );
}
