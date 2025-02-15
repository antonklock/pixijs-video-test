import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H3ALoss: SceneObject = {
    id: "H3-A-LOSS",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4ef50684bc0cc5e12498ebd29f593caf/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/1IBFpzwC2vJd98RVOgsn2feI3pagFr67Aycvmz71NpI.m3u8' // Mux
        mux: 'https://klockworks.xyz/H3-A-LOSS/playlist.m3u8' // R2
    },
    name: 'Armbrytning - Förlorar',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H3-A-LOSS-END",
            triggerTime: 9,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H3ALoss;