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
                console.log(`HLS media attached for video ${video.id}`);
                const successDiv = document.createElement("div");
                successDiv.style.position = "absolute";
                successDiv.style.bottom = "20px";
                successDiv.style.right = "20px";
                successDiv.style.backgroundColor = "green";
                successDiv.style.borderRadius = "8px";
                successDiv.style.padding = "10px";
                successDiv.style.zIndex = "1000"; // Ensure it appears above other elements

                const successMessage = document.createElement("p");
                successMessage.textContent = `HLS media attached for video ${video.id}`;
                successMessage.style.color = "white"; // Set text color to white for better contrast

                successDiv.appendChild(successMessage);
                document.body.appendChild(successDiv);

                setTimeout(() => {
                    document.body.removeChild(successDiv);
                }, 3000);
            });

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                // console.log(`HLS manifest parsed for video ${video.id}`);
                const infoDiv = document.createElement("div");
                infoDiv.style.position = "absolute";
                infoDiv.style.bottom = "20px";
                infoDiv.style.right = "20px";
                infoDiv.style.backgroundColor = "blue";
                infoDiv.style.borderRadius = "8px";
                infoDiv.style.padding = "10px";
                infoDiv.style.zIndex = "1000"; // Ensure it appears above other elements

                const infoMessage = document.createElement("p");
                infoMessage.textContent = `HLS manifest parsed for video ${video.id}`;
                infoMessage.style.color = "white"; // Set text color to white for better contrast

                infoDiv.appendChild(infoMessage);
                document.body.appendChild(infoDiv);

                setTimeout(() => {
                    document.body.removeChild(infoDiv);
                }, 3000);
                resolve({ element: video, hls });
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    console.error(`HLS fatal error ${video.id}: ${data.type}`);
                    const errorDiv = document.createElement("div");
                    errorDiv.style.position = "absolute";
                    errorDiv.style.bottom = "20px";
                    errorDiv.style.right = "20px";
                    errorDiv.style.backgroundColor = "red";
                    errorDiv.style.borderRadius = "8px";
                    errorDiv.style.padding = "10px";
                    errorDiv.style.zIndex = "1000"; // Ensure it appears above other elements

                    const errorMessage = document.createElement("p");
                    errorMessage.textContent = `HLS fatal error ${video.id}: ${data.type}`;
                    errorMessage.style.color = "white"; // Set text color to white for better contrast

                    errorDiv.appendChild(errorMessage);
                    document.body.appendChild(errorDiv);

                    setTimeout(() => {
                        document.body.removeChild(errorDiv);
                    }, 3000);

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
    video.loop = true;
    video.crossOrigin = "anonymous";
    video.preload = "auto";
    video.style.position = "absolute";
    video.style.height = "108px";
    video.style.width = "192px";
    video.style.opacity = "0";
    video.style.pointerEvents = "none";
    video.style.zIndex = "-1000";
    document.body.appendChild(video);

    return video;
};

export default loadVideo;