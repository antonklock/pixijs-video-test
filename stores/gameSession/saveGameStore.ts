import { create } from 'zustand';

interface SaveGameState {
    isSaving: boolean;
    setIsSaving: (isSaving: boolean) => void;
}

const useSaveGameStore = create<SaveGameState>((set) => ({
    isSaving: false,
    setIsSaving: (isSaving) => set({ isSaving }),
}));

export default useSaveGameStore;
