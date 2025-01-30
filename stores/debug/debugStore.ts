import { create } from 'zustand';

export interface DebugStore {
    showHitboxes: boolean;
    showLoadingIndicators: boolean;
    setShowHitboxes: (value: boolean) => void;
    setShowLoadingIndicators: (value: boolean) => void;
}

const useDebugStore = create<DebugStore>((set) => ({
    showHitboxes: false,
    showLoadingIndicators: true,
    setShowHitboxes: (value: boolean) => set({ showHitboxes: value }),
    setShowLoadingIndicators: (value: boolean) => set({ showLoadingIndicators: value }),
}));

export default useDebugStore;