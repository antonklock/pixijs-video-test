import { sceneObjects } from "@/config/sceneConfig";
import Hls from "hls.js";
import determineHub from "./determineHub";
import useDebugStore from "@/stores/debug/debugStore";
import useGameSessionStore from "@/stores/gameSession/gameSession";
import useAlertStore from "@/stores/Alerts/AlertStore";

interface HLSVideo {
    element: HTMLVideoElement;
    hls: Hls | null;
}

const loadVideo = async (id: string) => {
    const sceneObject = sceneObjects.find((obj) => obj.id === id);

    // let source = gameGlobals.videoProvider === "R2" ? sceneObject?.source.R2 : sceneObject?.source.cloudflare;
    let source = sceneObject?.source.R2;

    // TODO: This is a hack to load the correct video for the hub
    if (id.includes("H0")) {
        // console.log("Started scenes: ", useGameSessionStore.getState().startedScenes);

        const hub = determineHub();
        // console.log(`%cLoading video for %c${hub}`, 'color: #bbffbb; font-weight: regular;', 'color: orange; font-weight: bold;');
        source = `https://klockworks.xyz/${hub}/playlist.m3u8`;
    }

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

        // Skip native HLS check and directly use hls.js
        if (Hls.isSupported()) {
            const hls = new Hls({
                debug: false,
                enableWorker: true,
                lowLatencyMode: true,
            });

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                resolve({ element: video, hls });
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    console.error(`HLS fatal error ${video.id}: ${data.type}`);
                    reject(data.error);
                }
            });

            hls.attachMedia(video);
            hls.loadSource(source);
        } else {
            reject(new Error("HLS not supported"));
        }
    });
};

const initVideo = (video: HTMLVideoElement) => {
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");
    video.muted = true;
    video.loop = true;
    video.autoplay = false;
    video.crossOrigin = "anonymous";
    video.preload = "auto";
    video.style.position = "absolute";
    video.style.top = "50%";
    video.style.left = "50%";
    video.style.transform = "translate(-50%, -50%)";
    video.style.height = "auto";
    video.style.width = "100%";
    video.style.opacity = "0";
    video.style.pointerEvents = "none";
    video.style.zIndex = "-1000";
    document.body.appendChild(video);

    return video;
};

export default loadVideo;
