import { create } from 'zustand';
import { GameGlobals, StagedSceneObject } from '@/types';
import { Application } from 'pixi.js';
import handleAddNewScene from './handleAddNewScene';
import handleSetCurrentScene from './handleSetCurrentScene';
import handleSwitchToScene from './handleSwitchToScene';
import handleUnstageScene from './handleUnstageScene';

export interface GameGlobalsStore extends GameGlobals {
    loadingScenes: Set<string>;
    addNewScene: (sceneId: string) => Promise<StagedSceneObject | null>;
    setStagedScenes: (scenes: StagedSceneObject[]) => void;
    setCurrentScene: (sceneId: string | null) => void;
    setApp: (app: Application | null) => void;
    setCanvas: (canvas: HTMLCanvasElement | null) => void;
    setIsGameRunning: (isRunning: boolean) => void;
    switchToScene: (sceneId: string, loadNextScenes?: boolean) => Promise<void>;
    unstageScene: (sceneId: string) => void;
}

const useGameGlobalsStore = create<GameGlobalsStore>((set, get) => ({
    isGameRunning: false,
    videoProvider: "mux",
    hitboxes: [],
    loadingScenes: new Set(),
    stagedScenes: [],
    currentScene: null,
    app: null,
    canvas: null,
    setApp: (app) => set({ app }),
    setCanvas: (canvas) => set({ canvas }),
    setIsGameRunning: (isRunning) => set({ isGameRunning: isRunning }),
    setStagedScenes: (scenes) => set({ stagedScenes: scenes }),
    setCurrentScene: (sceneId) => handleSetCurrentScene(sceneId, get, set),
    addNewScene: async (sceneId: string): Promise<StagedSceneObject | null> => {
        const result = await handleAddNewScene(sceneId, get, set);
        return result as StagedSceneObject | null;
    },
    switchToScene: (sceneId, loadNextScenes = true) => handleSwitchToScene({ sceneId, loadNextScenes, get, set }),
    unstageScene: (sceneId: string) => handleUnstageScene(sceneId, get, set),
}));

export default useGameGlobalsStore;