import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import useFxStore from "@/stores/FX/fxStore";

const L2: SceneObject = {
    id: "L2",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/G0/playlist.m3u8'
    },
    name: 'Intro sovrum',
    nextScenes: [],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "L2-END",
            triggerTime: 17.25 + 2,
            runEvent: () => {
                useFxStore.getState().fadeToBlack(2000);
            }
        },
        {
            name: "L2-END-GAME",
            triggerTime: 17.25 + 4,
            runEvent: () => {
                useGameGlobalsStore.getState().endGame();
            }
        },
    ]
}

export default L2;