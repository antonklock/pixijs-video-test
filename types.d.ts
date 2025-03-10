export interface VideoSwitcherProps {
    gameGlobals: GameGlobals;
    setStagedScenes: (scenes: StagedSceneObject[]) => void;
    setCurrentSceneId: (scene: string | null) => void;
    setGameGlobals: (gameGlobals: GameGlobals) => void;
    handleLoadSceneById: (id: string, autoplay: boolean) => void;
}

export interface Dimensions {
    width: number;
    height: number;
    scale: number;
}

export interface PendingVideo {
    id: string;
    source: string | undefined;
    isLoaded: boolean;
    video?: HTMLVideoElement | null;
    hls?: Hls | null;
    sprite?: PIXI.Sprite | null;
    clear: () => void;
}

export interface SceneEvent {
    name: string;
    triggerTime: number;
    runEvent: () => void;
}

export interface SceneObject {
    id: string;
    name: string | undefined;
    source: {
        mux: string;
        cloudflare: string;
        R2: string;
    }
    video: {
        player: MediaPlayerElement | null;
        hls: Hls | null;
        sprite: PIXI.Sprite | null;
    }
    nextScenes: string[];
    autoplay?: boolean;
    sceneEvents?: SceneEvent[];
    hitboxes: Hitbox[];
    customProperties?: {
        [key: string]: string | number | boolean;
    }
};

export interface StagedSceneObject extends SceneObject {
    loading: boolean;
    isActive: boolean;
    isReady: boolean;
    clear: () => void;
}

export interface GameGlobals {
    gameState: "notStarted" | "playing" | "lost" | "won";
    isGameRunning: boolean;
    app: PIXI.Application | null;
    canvas: HTMLCanvasElement | null;
    currentScene: StagedSceneObject | null;
    stagedScenes: StagedSceneObject[];
    videoProvider: "mux" | "cloudflare" | "R2";
    hitboxes: PIXI.Container[];
    coins: number;
    sceneEvents: Set<string>;
}

export interface Session {
    scene: SceneObject;
    timeStarted: Date;
    timeEnded: Date | null;
}

export interface GameSession {
    id: string;
    userToken: string;
    startedScenes: Set<string>;
    session: Session[];
    startScene: (scene: SceneObject, timeStarted: Date) => void;
    endScene: (scene: SceneObject, timeEnded: Date) => void;
    clearSession: () => void;
}

export interface PerformanceMetrics {
    loadTime: number;
    domContentLoaded: number;
    firstPaint: number;
    firstContentfulPaint: number;
}

export interface Metadata {
    userAgent: string;
    language: string;
    screenWidth: number;
    screenHeight: number;
    timeZone: string;
    sessionStartTime: string;
    referrer: string;
}   