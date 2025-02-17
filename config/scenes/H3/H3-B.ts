import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
const H3B: SceneObject = {
    id: "H3-B",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H3-B/playlist.m3u8' // R2
    },
    name: 'Spelaren förlorar',
    nextScenes: ["G0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H3-B-END",
            triggerTime: 6,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("G0");
            },
        }
    ]
}

export default H3B;