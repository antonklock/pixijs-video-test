import { sceneObjects } from "@/config/sceneConfig";
import Hls from "hls.js";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

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

        const loadedVideo = await setupHls(source);
        return loadedVideo;
    } catch (error) {
        console.warn(`Error loading video ${id}: ${error}`);
        return null;
    }
}

const setupHls = async (source: string) => {
    return new Promise<HLSVideo>((resolve, reject) => {
        const newVideoElement = document.createElement("video");
        const video = initVideo(newVideoElement);

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
                resolve({ element: video, hls });
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    console.error(`HLS fatal error ${video.id}: ${data.type}`);
                    reject(data.error);
                    // onError(`HLS fatal error ${video.id}: ${data.type}`);
                }
            });

            hls.attachMedia(video);
            hls.loadSource(source);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = source;
            video.addEventListener("loadedmetadata", () => {
                resolve({ element: video, hls: null });
            });
            video.addEventListener("error", (error) => {
                reject(error.error as Error);
            });
        } else {
            reject(new Error("HLS not supported"));
        }
    });
};

const initVideo = (video: HTMLVideoElement) => {
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.muted = true;
    video.crossOrigin = "anonymous";
    video.preload = "auto";
    video.style.position = "absolute";
    video.style.opacity = "0";
    video.style.pointerEvents = "none";
    video.style.zIndex = "-1000";
    document.body.appendChild(video);

    return video;
};

export default loadVideo;