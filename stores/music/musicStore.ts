import { create } from 'zustand';

interface MusicStore {
    source: string;
    currentTime: number;
    isPlaying: boolean;
    setSource: (source: string) => void;
    setCurrentTime: (currentTime: number) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    triggers: {
        [key: string]: number;
    };
}

const useMusicStore = create<MusicStore>((set) => ({
    source: '',
    currentTime: 0,
    isPlaying: false,
    triggers: {},
    setSource: (source: string) => set({ source }),
    setCurrentTime: (currentTime: number) => set({ currentTime }),
    setIsPlaying: (isPlaying: boolean) => set({ isPlaying })
}));

export default useMusicStore;
