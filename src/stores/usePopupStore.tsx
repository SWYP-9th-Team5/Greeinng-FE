import { create } from 'zustand';

interface PopupState {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  mode?: 'single' | 'double';
  className?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  openPopup: (
    props: Omit<PopupState, 'isOpen' | 'openPopup' | 'closePopup'>,
  ) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  title: '',
  description: '',
  confirmText: '',
  cancelText: '',
  mode: 'double',
  className: '',
  onCancel: undefined,
  onConfirm: () => {},
  openPopup: (props) =>
    set({
      ...props,
      isOpen: true,
    }),
  closePopup: () =>
    set({
      isOpen: false,
      title: '',
      description: '',
      confirmText: '',
      cancelText: '',
      mode: 'double',
      className: '',
      onConfirm: () => {},
      onCancel: undefined,
    }),
}));
