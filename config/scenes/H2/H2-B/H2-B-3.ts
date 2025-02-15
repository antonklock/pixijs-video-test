import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
const H2B3: SceneObject = {
    id: "H2-B-3",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4d3e1cd5a89d1cc67b3acc96bb69a9c1/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/ULOR72CqZPtPWx3wzpKw17IMseX9OMr8Mn7xXe02zyCs.m3u8' // Mux
        mux: 'https://klockworks.xyz/H2-B-3/playlist.m3u8' // R2
    },
    name: 'Ta mynt - Misslyckas',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H2-B-3-END",
            triggerTime: 9,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H2B3;