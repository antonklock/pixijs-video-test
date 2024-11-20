import Hls from "hls.js";
import { useRef, useState } from "react";

interface UseHLSPlayerProps {
    onError: (error: string) => void;
}

export const useHLSPlayer = ({ onError }: UseHLSPlayerProps) => {
    const videosRef = useRef<HTMLVideoElement[] | null[]>([]);
    const hlsInstancesRef = useRef<Hls[] | null[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const initVideo = (video: HTMLVideoElement) => {
        video.setAttribute("playsinline", "true");
        video.setAttribute("webkit-playsinline", "true");
        video.muted = true;
        video.crossOrigin = "anonymous";
        video.preload = "auto";

        // Add to DOM but hide
        // video.style.position = "absolute";
        // video.style.opacity = "0";
        // video.style.pointerEvents = "none";
        // video.style.zIndex = "-1000";
        // document.body.appendChild(video);

        return video;
    };

    const setupHls = async (source: string, index: number) => {
        return new Promise<HTMLVideoElement>((resolve, reject) => {
            const video = initVideo(document.createElement("video"));
            // const videos: HTMLVideoElement[] = [];
            // videos[index] = video;
            videosRef.current[index] = video;

            if (Hls.isSupported()) {
                const hls = new Hls({
                    debug: false,
                    enableWorker: true,
                    lowLatencyMode: true,
                });

                hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    console.log(`HLS media attached for video ${index}`);
                });

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    console.log(`HLS manifest parsed for video ${index}`);
                    resolve(video);
                });

                hls.on(Hls.Events.ERROR, (event, data) => {
                    if (data.fatal) {
                        reject(data.error);
                        onError(`HLS fatal error ${index}: ${data.type}`);
                    }
                });

                hls.attachMedia(video);
                hls.loadSource(source);
                // const hlsInstances: Hls[] = [];
                // hlsInstances[index] = hls;
                hlsInstancesRef.current[index] = hls;
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = source;
                video.addEventListener("loadedmetadata", () => {
                    resolve(video);
                });
                video.addEventListener("error", (error) => {
                    reject(error.error as Error);
                });
            }
        });
    };

    const cleanupVideo = (index: number) => {
        const video = videosRef.current[index];
        if (video) {
            video.pause();
            video.removeAttribute("src");
            video.load();
            video.remove();
        }

        const hls = hlsInstancesRef.current[index];
        if (hls) {
            hls.stopLoad();
            hls.detachMedia();
            hls.destroy();
        }

        videosRef.current[index] = null;
        hlsInstancesRef.current[index] = null;
    };

    return {
        videosRef,
        hlsInstancesRef,
        currentIndex,
        setCurrentIndex,
        isPlaying,
        setIsPlaying,
        setupHls,
        cleanupVideo,
    };
};