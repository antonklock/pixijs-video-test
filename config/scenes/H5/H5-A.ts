import { SceneObject } from "@/types";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

const H5A: SceneObject = {
    id: "H5-A",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H5-A/playlist.m3u8' // R2
    },
    name: 'Ta lutan',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H5-A-COIN",
            triggerTime: 25,
            runEvent: () => {
                useGameGlobalsStore.getState().addCoinsAndCheckWin(1);
            },
        },
        {
            name: "H5-A-END",
            triggerTime: 26,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H5A;