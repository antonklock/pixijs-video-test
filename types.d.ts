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

export interface SceneObject {
    id: string;
    name: string | undefined;
    // url: string | undefined; // TODO: Rename to source
    source: {
        mux: string;
        cloudflare: string;
    }
    video: {
        player: MediaPlayerElement | null;
        hls: Hls | null;
        sprite: PIXI.Sprite | null;
    }
    nextScenes: string[];
    autoplay?: boolean;
    // player: MediaPlayerElement | undefined;
    // canPlay: boolean;
    // isLoaded: boolean;
    // isCurrent: boolean;
    // loop: boolean;
    // isActive: boolean;
    hitboxes: Hitbox[];
    // sceneEndTime?: number;
    // triggerTime?: number;
    // play?: () => void;
    // onSceneEnd?: () => void;
    // runFunctionAtTime?: () => void;
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
    isGameRunning: boolean;
    app: PIXI.Application | null;
    canvas: HTMLCanvasElement | null;
    currentScene: StagedSceneObject | null;
    stagedScenes: StagedSceneObject[];
    videoProvider: "mux" | "cloudflare";
    hitboxes: PIXI.Graphics[];
}
