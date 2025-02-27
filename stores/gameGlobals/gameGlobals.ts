import { create } from 'zustand';
import { GameGlobals, StagedSceneObject } from '@/types';
import { Application } from 'pixi.js';
import handleAddNewScene from './handleAddNewScene';
import handleSetCurrentScene from './handleSetCurrentScene';
import handleSwitchToScene from './handleSwitchToScene';
import handleUnstageScene from './handleUnstageScene';

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
    musicPlayer: HTMLAudioElement | null;
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
    setPixiContainer: (pixiContainer: HTMLDivElement | null) => void;
    endGame: () => void;
    setMusicPlayer: (musicPlayer: HTMLAudioElement | null) => void;
    cleanup: () => void;
    setCleanup: (cleanup: () => void) => void;
    setGameTime: (gameTime: number) => void;
    cleanupPixi: () => void;
    setIsMobile: (isMobile: boolean) => void;
    gameTime: number;
    loseTime: number;
    videoOffset: number;
    isMobile: boolean;
}

const useGameGlobalsStore = create<GameGlobalsStore>((set, get) => (
    {
        gameState: "notStarted",
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
        // setGameMusic: (gameMusic: HTMLAudioElement | null) => set({ gameMusic }),
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
        setMusicPlayer: (musicPlayer: HTMLAudioElement | null) => set({ musicPlayer }),
        cleanup: () => null,
        setCleanup: (cleanup: () => void) => set({ cleanup }),
        setGameTime: (gameTime: number) => set({ gameTime }),
        cleanupPixi: () => {
            get().app?.destroy(true);
            get().pixiContainer = null;
            get().canvas = null;
            get().app = null;
        },
        setIsMobile: (isMobile: boolean) => set({ isMobile }),
        gameTime: 0,
        // loseTime: 237,
        loseTime: 70,
        videoOffset: 30.72,
        isMobile: false,
    }
));

export default useGameGlobalsStore;