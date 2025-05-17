'use client';

import { usePopupStore } from '@/stores/usePopupStore';
import { cn } from '@/utils/cn';

import Button from '@components/common/Button';
import FocusTrap from '@components/common/FocusTrap';

import useOutsideClick from '@hooks/useOutsideClick';

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
  const { ref } = useOutsideClick<HTMLDivElement>(() => closePopup());

  if (!isOpen) return;
  return (
    <div
      className={cn(
        'fixed inset-0 z-1000 hidden h-full w-full bg-[rgba(51,51,51,0.3)]',
        isOpen && 'flex items-center justify-center',
      )}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title}
        aria-describedby={description}
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
    </div>
  );
}
