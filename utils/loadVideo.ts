import { sceneObjects } from "@/config/sceneConfig";
import Hls from "hls.js";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import determineHub from "./determineHub";
import useDebugStore from "@/stores/debug/debugStore";
import useGameSessionStore from "@/stores/gameSession/gameSession";
import useAlertStore from "@/stores/Alerts/AlertStore";

interface HLSVideo {
    element: HTMLVideoElement;
    hls: Hls | null;
}

const loadVideo = async (id: string) => {
    const gameGlobals = useGameGlobalsStore.getState();
    const sceneObject = sceneObjects.find((obj) => obj.id === id);

    // let source = gameGlobals.videoProvider === "R2" ? sceneObject?.source.R2 : sceneObject?.source.cloudflare;
    let source = sceneObject?.source.R2;

    // TODO: This is a hack to load the correct video for the hub
    if (id.includes("H0")) {
        console.log("Started scenes: ", useGameSessionStore.getState().startedScenes);

        const hub = determineHub();
        console.log(`%cLoading video for %c${hub}`, 'color: #bbffbb; font-weight: regular;', 'color: orange; font-weight: bold;');
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

        if (Hls.isSupported()) {
            const hls = new Hls({
                debug: false,
                enableWorker: true,
                lowLatencyMode: true,
            });

            if (useDebugStore.getState().showHlsMessages || localStorage.getItem("showHlsMessages") === "true") {
                useAlertStore.getState().addAlert({
                    title: `HLS initialized for video ${video.id}`,
                    message: `HLS initialized for video ${video.id}`,
                    color: "blue"
                });
            }

            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                if (useDebugStore.getState().showHlsMessages || localStorage.getItem("showHlsMessages") === "true") {
                    useAlertStore.getState().addAlert({
                        title: `HLS media attached for video ${video.id}`,
                        message: `HLS media attached for video ${video.id}`,
                        color: "green"
                    });
                }
            });

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (useDebugStore.getState().showHlsMessages || localStorage.getItem("showHlsMessages") === "true") {
                    useAlertStore.getState().addAlert({
                        title: `HLS manifest parsed for video ${video.id}`,
                        message: `HLS manifest parsed for video ${video.id}`,
                        color: "blue"
                    });
                }
                resolve({ element: video, hls });
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    console.error(`HLS fatal error ${video.id}: ${data.type}`);
                    if (useDebugStore.getState().showHlsMessages) {
                        useAlertStore.getState().addAlert({
                            title: `HLS fatal error ${video.id}: ${data.type}`,
                            message: `HLS fatal error ${video.id}: ${data.type}`,
                            color: "red"
                        });
                    }
                    reject(data.error);
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
    video.loop = true;
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