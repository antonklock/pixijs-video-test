import { create } from 'zustand';
import gameGlobals from '../gameGlobals/gameGlobals';
import * as PIXI from 'pixi.js';
export interface DebugStore {
    showHitboxes: boolean;
    showLoadingIndicators: boolean;
    showDebugMenu: boolean;
    showDebugInfo: boolean;
    showCurrentVideoTime: boolean;
    sceneEvents: Set<string>;
    showCoins: boolean;
    showHlsMessages: boolean;
    setShowHitboxes: (value: boolean) => void;
    setShowLoadingIndicators: (value: boolean) => void;
    setShowDebugMenu: (value: boolean) => void;
    setShowDebugInfo: (value: boolean) => void;
    setShowCurrentVideoTime: (value: boolean) => void;
    setShowCoins: (value: boolean) => void;
    setShowHlsMessages: (value: boolean) => void;
}

const useDebugStore = create<DebugStore>((set) => ({
    showHitboxes: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('showHitboxes') || 'false') : false,
    showLoadingIndicators: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('showLoadingIndicators') || 'true') : true,
    showDebugMenu: false,
    showDebugInfo: false,
    showCurrentVideoTime: false,
    sceneEvents: new Set(),
    showCoins: false,
    showHlsMessages: false,
    setShowHitboxes: (value: boolean) => {
        set({ showHitboxes: value });
        if (typeof window !== 'undefined') {
            localStorage.setItem('showHitboxes', JSON.stringify(value));
        }
        toggleHitboxes();
    },
    setShowLoadingIndicators: (value: boolean) => {
        set({ showLoadingIndicators: value });
        if (typeof window !== 'undefined') {
            localStorage.setItem('showLoadingIndicators', JSON.stringify(value));
        }
    },
    setShowDebugMenu: (value: boolean) => set({ showDebugMenu: value }),
    setShowDebugInfo: (value: boolean) => set({ showDebugInfo: value }),
    setShowCurrentVideoTime: (value: boolean) => {
        set((state) => ({ ...state, showCurrentVideoTime: value }));
        if (typeof window !== 'undefined') {
            localStorage.setItem('showCurrentVideoTime', JSON.stringify(value));
        }
    },
    setShowCoins: (value: boolean) => set({ showCoins: value }),
    setShowHlsMessages: (value: boolean) => {
        set({ showHlsMessages: value });
        if (typeof window !== 'undefined') {
            localStorage.setItem('showHlsMessages', JSON.stringify(value));
        }
    },
}));

export default useDebugStore;

const toggleHitboxes = () => {
    const showHitboxes = useDebugStore.getState().showHitboxes;

    console.log(`Hitboxes toggled: %c${showHitboxes ? "ON" : "OFF"}`, `color: ${showHitboxes ? "green" : "red"}`);

    const app = gameGlobals.getState().app;
    if (!app) return;

    app.stage.children.forEach((child: PIXI.ContainerChild) => {
        if (child.label && child.label.includes("HB")) {
            child.alpha = !showHitboxes ? 0 : 1;
            child.children.forEach((child) => {
                child.alpha = !showHitboxes ? 0 : 1;
            });
        }
    });
};