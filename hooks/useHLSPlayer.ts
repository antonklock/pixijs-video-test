import Hls from "hls.js";
import { useEffect, useState } from "react";
import { sceneObjects } from "@/config/sceneConfig";
import { PendingVideo, StagedSceneObject } from "@/types";

interface UseHLSPlayerProps {
    onError: (error: string) => void;
    videosRef: React.MutableRefObject<HTMLVideoElement[] | null[]>;
    hlsInstancesRef: React.MutableRefObject<Hls[] | null[]>;
}

interface HLSVideo {
    video: HTMLVideoElement;
    hls: Hls | null;
}

export const useHLSPlayer = (props: UseHLSPlayerProps) => {
    const { onError, videosRef, hlsInstancesRef } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

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
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
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

    const loadVideo = async (id: string) => {
        const sceneObject = sceneObjects.find((obj) => obj.id === id);

        try {
            if (!sceneObject) throw new Error(`Scene object not found for ${id}`);
            if (!sceneObject.url) throw new Error(`No URL found for scene ${id}`);

            const loadedVideo = await setupHls(sceneObject.url);
            return loadedVideo;
        } catch (error) {
            console.warn(`Error loading video ${id}: ${error}`);
            return null;
        }
    }

    return {
        videosRef,
        hlsInstancesRef,
        currentIndex,
        setCurrentIndex,
        isPlaying,
        setIsPlaying,
        setupHls,
        loadVideo,
    };
};