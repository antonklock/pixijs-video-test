import { SceneObject } from "@/types";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

const H5B: SceneObject = {
    id: "H5-B",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H5-B/playlist.m3u8' // R2
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