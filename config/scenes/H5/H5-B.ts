import { SceneObject } from "@/types";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

const H5B: SceneObject = {
    id: "H5-B",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/699da2dd3426b36a3a92bca1d7385e6c/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/ZrK2Xh1G8ru8vGhpOgFISjcdAlHxKA7PPD00IfaA4Gzc.m3u8' // Mux
        mux: 'https://klockworks.xyz/H5-B/playlist.m3u8' // R2
    },
    name: 'Ta fiolen',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H5-B-END",
            triggerTime: 10,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H5B;