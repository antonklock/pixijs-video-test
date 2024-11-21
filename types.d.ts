export interface VideoSwitcherProps {
    gameGlobals: GameGlobals;
    setStagedScenes: (scenes: StagedSceneObject[]) => void;
    setCurrentSceneId: (scene: string | null) => void;
    setGameGlobals: (gameGlobals: GameGlobals) => void;
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
    url: string | undefined; // TODO: Rename to source
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
    // hitboxes: Hitbox[];
    // sceneEndTime?: number;
    // triggerTime?: number;
    // play?: () => void;
    // onSceneEnd?: () => void;
    // runFunctionAtTime?: () => void;
};

export interface StagedSceneObject extends SceneObject {
    loading: boolean;
    isActive: boolean;
    isReady: boolean;
    clear: () => void;
}

interface GameGlobals {
    isGameRunning: boolean;
    stagedScenes: StagedSceneObject[];
    currentSceneId: string | null;
}