import { sceneObjects } from "@/config/sceneConfig";
import Hls from "hls.js";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import gameGlobals from "@/stores/gameGlobals/gameGlobals";

interface HLSVideo {
    element: HTMLVideoElement;
    hls: Hls | null;
}

const loadVideo = async (id: string) => {
    const gameGlobals = useGameGlobalsStore.getState();
    const sceneObject = sceneObjects.find((obj) => obj.id === id);

    const source = gameGlobals.videoProvider === "mux" ? sceneObject?.source.mux : sceneObject?.source.cloudflare;

    try {
        if (!sceneObject) throw new Error(`Scene object not found for ${id}`);
        if (!source) throw new Error(`No URL found for scene ${id}`);

        const loadedVideo = await setupHls(source, id);
        return loadedVideo;
    } catch (error) {
        console.warn(`Error loading video ${id}: ${error}`);
        return null;
    }
}

const setupHls = async (source: string, id: string) => {
    return new Promise<HLSVideo>((resolve, reject) => {
        // const newVideoElement = document.createElement("video");
        // const video = initVideo(newVideoElement);

        const videoPlayer = gameGlobals.getState().videoPlayers.find((videoElement) => {
            return !videoElement.classList.contains(`video-${id}`);
        });
        if (!videoPlayer) return reject(new Error("Can load new video. No player available!"));

        if (videoPlayer.classList.contains(`video-${id}`)) return reject(new Error("Video already loaded!"));

        videoPlayer.classList.add(`video-${id}`);
        console.log("Added class to", videoPlayer);

        if (Hls.isSupported()) {
            const hls = new Hls({
                debug: false,
                enableWorker: true,
                lowLatencyMode: true,
            });

            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                console.log(`HLS media attached for video ${videoPlayer.id}`);
            });

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log(`HLS manifest parsed for video ${videoPlayer.id}`);
                console.log("hlsVideo: ", { element: videoPlayer, hls });
                resolve({ element: videoPlayer, hls });
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    console.error(`HLS fatal error ${videoPlayer.id}: ${data.type}`);
                    reject(data.error);
                    // onError(`HLS fatal error ${video.id}: ${data.type}`);
                }
            });

            hls.attachMedia(videoPlayer);
            hls.loadSource(source);
        } else if (videoPlayer.canPlayType("application/vnd.apple.mpegurl")) {
            videoPlayer.src = source;
            videoPlayer.addEventListener("loadedmetadata", () => {
                resolve({ element: videoPlayer, hls: null });
            }, { once: true });
            videoPlayer.addEventListener("error", (error) => {
                reject(error.error as Error);
            }, { once: true });
        } else {
            reject(new Error("HLS not supported"));
        }
    });
};

export const initVideo = (video: HTMLVideoElement) => {
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.muted = true;
    video.loop = true;
    video.crossOrigin = "anonymous";
    video.preload = "auto";
    video.style.position = "absolute";
    video.style.opacity = "0";
    video.style.pointerEvents = "none";
    video.style.zIndex = "-1000";
    video.setAttribute("autoplay", "false");
    document.body.appendChild(video);

    return video;
};

export default loadVideo;