import Hls from "hls.js";
import { useEffect, useState } from "react";
import { sceneObjects } from "@/config/sceneConfig";
import { PendingVideo } from "@/types";

interface UseHLSPlayerProps {
    onError: (error: string) => void;
    videosRef: React.MutableRefObject<HTMLVideoElement[] | null[]>;
    hlsInstancesRef: React.MutableRefObject<Hls[] | null[]>;
    pendingVideos: PendingVideo[];
}

interface HLSVideo {
    video: HTMLVideoElement;
    hls: Hls | null;
}

export const useHLSPlayer = (props: UseHLSPlayerProps) => {
    const { onError, videosRef, hlsInstancesRef, pendingVideos } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        console.log("pendingVideos:", pendingVideos);
    }, [pendingVideos]);

    const initVideo = (video: HTMLVideoElement) => {
        video.setAttribute("playsinline", "true");
        video.setAttribute("webkit-playsinline", "true");
        video.muted = true;
        video.crossOrigin = "anonymous";
        video.preload = "auto";

        // Add to DOM but hide
        video.style.position = "absolute";
        video.style.opacity = "0";
        video.style.pointerEvents = "none";
        video.style.zIndex = "-1000";
        document.body.appendChild(video);

        return video;
    };

    const setupHls = async (source: string) => {
        return new Promise<HLSVideo>((resolve, reject) => {
            const video = initVideo(document.createElement("video"));

            if (Hls.isSupported()) {
                const hls = new Hls({
                    debug: false,
                    enableWorker: true,
                    lowLatencyMode: true,
                });

                hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    // console.log(`HLS media attached for video ${video.id}`);
                });

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    // console.log(`HLS manifest parsed for video ${video.id}`);
                    resolve({ video, hls });
                });

                hls.on(Hls.Events.ERROR, (event, data) => {
                    if (data.fatal) {
                        reject(data.error);
                        onError(`HLS fatal error ${video.id}: ${data.type}`);
                    }
                });

                hls.attachMedia(video);
                hls.loadSource(source);
                // hlsInstancesRef.current[index] = hls;
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                console.log("video can play m3u8");
                video.src = source;
                video.addEventListener("loadedmetadata", () => {
                    resolve({ video, hls: null });
                });
                video.addEventListener("error", (error) => {
                    reject(error.error as Error);
                });
            }
        });
    };

    const cleanupVideo = (pendingVideo: PendingVideo) => {
        const video = pendingVideo.video;
        const hls = pendingVideo.hls;
        if (video) {
            video.pause();
            video.removeAttribute("src");
            video.load();
            video.remove();
        }
        if (hls) {
            hls.stopLoad();
            hls.detachMedia();
            hls.destroy();
        }
    };

    const loadVideo = async (id: string) => {
        console.log("loadVideos", id);
        const sceneObject = sceneObjects.find((obj) => obj.id === id);
        if (sceneObject) {
            const loadedVideo = await setupHls(sceneObject.url);
            console.log("loadedVideo", loadedVideo);
            return loadedVideo;
        }
        return null;
    }

    return {
        videosRef,
        hlsInstancesRef,
        currentIndex,
        setCurrentIndex,
        isPlaying,
        setIsPlaying,
        setupHls,
        cleanupVideo,
        loadVideo,
    };
};