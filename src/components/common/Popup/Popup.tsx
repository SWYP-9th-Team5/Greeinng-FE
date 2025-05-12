'use client';

import { usePopupStore } from '@/stores/usePopupStore';

import BasePopup from '@components/popup/BasePopup';

export default function Popup() {
  const {
    isOpen,
    title,
    description,
    confirmText,
    cancelText,
    mode,
    onConfirm,
    onCancel,
    closePopup,
  } = usePopupStore();

  if (!isOpen) return null;

  return (
    <BasePopup
      title={title}
      description={description}
      confirmText={confirmText}
      cancelText={cancelText}
      mode={mode}
      onConfirm={() => {
        onConfirm();
        closePopup();
      }}
      onCancel={() => {
        if (onCancel) onCancel();
        closePopup();
      }}
    />
  );
}
