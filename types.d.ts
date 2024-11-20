export interface VideoSwitcherProps {
    videoSources: string[];
    pendingVideos: PendingVideo[];
    setPendingVideos: (videos: PendingVideo[]) => void;
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
    url: string;
    player: MediaPlayerElement | undefined;
    canPlay: boolean;
    isLoaded: boolean;
    isCurrent: boolean;
    nextScenes: string[];
    loop: boolean;
    isActive: boolean;
    hitboxes: Hitbox[];
    sceneEndTime?: number;
    triggerTime?: number;
    play?: () => void;
    onSceneEnd?: () => void;
    runFunctionAtTime?: () => void;
};