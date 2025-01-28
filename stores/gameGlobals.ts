import { create } from 'zustand';
import { GameGlobals, StagedSceneObject } from '@/types';
import { Application } from 'pixi.js';
import addNewScene from './addNewScene';

export interface GameGlobalsStore extends GameGlobals {
    loadingScenes: Set<string>;
    addNewScene: (sceneId: string) => void;
    setStagedScenes: (scenes: StagedSceneObject[]) => void;
    setCurrentScene: (scene: string | null) => void;
    setApp: (app: Application | null) => void;
    setCanvas: (canvas: HTMLCanvasElement | null) => void;
    setIsGameRunning: (isRunning: boolean) => void;
    playScene: (sceneId: string) => void;
}

const useGameGlobalsStore = create<GameGlobalsStore>((set, get) => ({
    isGameRunning: false,
    loadingScenes: new Set(),
    stagedScenes: [],
    currentScene: null,
    app: null,
    canvas: null,
    setStagedScenes: (scenes) => set({ stagedScenes: scenes }),
    setCurrentScene: (sceneId) => {
        if (!sceneId) return;
        set((state) => {
            const currentScene = state.stagedScenes.find(scene => scene.id === sceneId);
            return { currentScene };
        });
    },
    setApp: (app) => set({ app }),
    setCanvas: (canvas) => set({ canvas }),
    setIsGameRunning: (isRunning) => set({ isGameRunning: isRunning }),
    addNewScene: (sceneId: string) => addNewScene(sceneId, get, set),
    playScene: (sceneId: string) => {
        const scene = get().stagedScenes.find(scene => scene.id === sceneId);
        if (!scene) return console.warn(`Can't play scene! Scene ${sceneId} not found.`);

        scene.video.sprite.visible = true;
        scene.video.player?.play();
        scene.isActive = true;
        set({ currentScene: scene });

        const { stagedScenes } = get();
        stagedScenes.forEach(scene => {
            if (scene.id === sceneId) return;
            scene.isActive = false;
            scene.video.sprite.visible = false;

            setTimeout(() => {
                scene.video.player?.pause();
                // scene.clear();
            }, 1000);
        });
    }
}));

export default useGameGlobalsStore;
