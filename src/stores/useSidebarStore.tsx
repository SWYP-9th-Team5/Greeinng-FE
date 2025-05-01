import { create } from 'zustand';

interface SidebarState {
  isSidebarOpen: boolean;
}

interface SidebarActions {
  actionSidebarClose: () => void;
  actionSidebarOpen: () => void;
}

export const useSidebarStore = create<SidebarState & SidebarActions>((set) => {
  const state: SidebarState = {
    isSidebarOpen: false,
  };

  const actions: SidebarActions = {
    actionSidebarClose: () => set(() => ({ isSidebarOpen: false })),
    actionSidebarOpen: () => set(() => ({ isSidebarOpen: true })),
  };

  return { ...state, ...actions };
});
