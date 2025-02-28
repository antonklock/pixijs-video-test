import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H6A: SceneObject = {
    id: "H6-A",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H6-A/playlist.m3u8' // R2
    },
    name: 'Stoppas i dörren. "Betala tre mynt!"',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H6-A-END",
            triggerTime: 8,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0", false);
            },
        }
    ]
}

export default H6A;