export interface VideoSwitcherProps {
    gameGlobals: GameGlobals;
    pendingVideos: PendingVideo[];
    setPendingVideos: (videos: PendingVideo[]) => void;

    setStagedScenes: (scenes: SceneObject[]) => void;
    setCurrentScene: (scene: SceneObject | null) => void;
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

interface SceneObject {
    id: string;
    name: string;
    url: string; // TODO: Rename to source
    video: {
        player: MediaPlayerElement | undefined;
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

export interface GameGlobals {
    isGameRunning: boolean;
    stagedScenes: SceneObject[];
    currentScene: SceneObject | null;
}