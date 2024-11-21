export interface VideoSwitcherProps {
    gameGlobals: GameGlobals;
    setStagedScenes: (scenes: StagedSceneObject[]) => void;
    setCurrentScene: (scene: StagedSceneObject | null) => void;
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
    isActive: boolean;
    isReady: boolean;
    clear: () => void;
}

export interface GameGlobals {
    isGameRunning: boolean;
    stagedScenes: StagedSceneObject[];
    currentScene: StagedSceneObject | null;
}