import { create } from 'zustand';
import { GameGlobals, StagedSceneObject } from '@/types';
import { Application } from 'pixi.js';
import handleAddNewScene from './handleAddNewScene';
import handleSetCurrentScene from './handleSetCurrentScene';
import handleSwitchToScene from './handleSwitchToScene';
import handleUnstageScene from './handleUnstageScene';
import * as Tone from 'tone';

export interface GameGlobalsStore extends GameGlobals {
    gameState: "notStarted" | "playing" | "lost" | "won";
    stageDimensions: {
        width: number;
        height: number;
    };
    pixiContainer: HTMLDivElement | null;
    coins: number;
    loadingScenes: Set<string>;
    sceneEvents: Set<string>;
    gameMusic: Howl | null;
    musicPlayer: Tone.Player | null;
    addNewScene: (sceneId: string) => Promise<StagedSceneObject | null>;
    setStagedScenes: (scenes: StagedSceneObject[]) => void;
    setCurrentScene: (sceneId: string | null) => void;
    setApp: (app: Application | null) => void;
    setCanvas: (canvas: HTMLCanvasElement | null) => void;
    setIsGameRunning: (isRunning: boolean) => void;
    switchToScene: (sceneId: string, loadNextScenes?: boolean) => Promise<void>;
    unstageScene: (sceneId: string) => void;
    setCoins: (coins: number) => void;
    addCoinsAndCheckWin: (newCoins: number) => void;
    setSceneEvents: (sceneEvents: Set<string>) => void;
    setGameState: (gameState: "notStarted" | "playing" | "lost" | "won") => void;
    setStageDimensions: (dimensions: { width: number, height: number }) => void;
    setGameMusic: (gameMusic: Howl | null) => void;
    setPixiContainer: (pixiContainer: HTMLDivElement | null) => void;
    endGame: () => void;
    setMusicPlayer: (musicPlayer: Tone.Player | null) => void;
}

const useGameGlobalsStore = create<GameGlobalsStore>((set, get) => (
    {
        gameState: "notStarted",
        gameMusic: null,
        pixiContainer: null,
        stageDimensions: { width: 0, height: 0 },
        isGameRunning: false,
        musicPlayer: null,
        videoProvider: "R2",
        currentScene: null,
        stagedScenes: [],
        loadingScenes: new Set(),
        sceneEvents: new Set(),
        app: null,
        canvas: null,
        hitboxes: [],
        coins: 0,
        setCoins: (coins: number) => set({ coins }),
        addCoinsAndCheckWin: (newCoins: number) => {
            set({ coins: get().coins + newCoins });
            if (get().coins >= 3) {
                console.log("GameState set to won");
                get().setGameState("won");
            }
        },
        setSceneEvents: (sceneEvents: Set<string>) => set({ sceneEvents }),
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
        setGameState: (gameState: "notStarted" | "playing" | "lost" | "won") => set({ gameState }),
        setStageDimensions: (dimensions: { width: number, height: number }) => set({ stageDimensions: dimensions }),
        setGameMusic: (gameMusic: Howl | null) => set({ gameMusic }),
        setPixiContainer: (pixiContainer: HTMLDivElement | null) => set({ pixiContainer }),
        endGame: () => {
            set({ isGameRunning: false })

            const videoPlayers = document.querySelectorAll("video");
            videoPlayers.forEach(video => {
                video.remove();
            });

            const canvas = document.querySelector("canvas");
            if (canvas) {
                canvas.remove();
            }

            // Reload the page
            setTimeout(() => {
                location.reload();
            }, 1000);
        },
        setMusicPlayer: (musicPlayer: Tone.Player | null) => set({ musicPlayer }),
    }
));

export default useGameGlobalsStore;