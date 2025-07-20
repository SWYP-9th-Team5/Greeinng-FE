import { create } from 'zustand';

interface DiaryState {
  isWatering: boolean;
  petPlantId: number;
  dailyRecordId: number;
  date: string;
}

interface DiaryModalState {
  isOpenDiaryModal: boolean;
  diaryState: DiaryState;
}

interface DiaryModalActions {
  handleOpenDiaryModal: () => void;
  handleCloseDiaryModal: () => void;
  handleSetDiaryState: (newState: Partial<DiaryState>) => void;
}

const initialDiaryState = {
  isWatering: false,
  petPlantId: 0,
  dailyRecordId: -1,
  date: '',
};

export const useDiaryModalStore = create<DiaryModalState & DiaryModalActions>(
  (set) => ({
    isOpenDiaryModal: false,
    diaryState: initialDiaryState,
    handleSetDiaryState: (newState) => {
      set((state) => ({
        diaryState: {
          ...state.diaryState,
          ...newState,
        },
      }));
    },
    handleOpenDiaryModal: () => set({ isOpenDiaryModal: true }),
    handleCloseDiaryModal: () =>
      set({ isOpenDiaryModal: false, diaryState: initialDiaryState }),
  }),
);
