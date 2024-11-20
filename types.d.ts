export interface VideoSwitcherProps {
    videoSources: string[];
    setPendingVideos: (videos: PendingVideo[]) => void;
}

export interface Dimensions {
    width: number;
    height: number;
    scale: number;
}

interface PendingVideo {
    source: string;
    index: number;
    isLoaded: boolean;
    video?: HTMLVideoElement | null;
    hls?: Hls | null;
    sprite?: PIXI.Sprite | null;
}