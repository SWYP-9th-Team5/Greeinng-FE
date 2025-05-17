import { create } from 'zustand';

interface TabState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  resetTab: () => void;
}

export const useTabStore = create<TabState>((set) => ({
  activeTab: 'QnA',
  setActiveTab: (tab) => set({ activeTab: tab }),
  resetTab: () => set({ activeTab: 'QnA' }),
}));
