import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H1B: SceneObject = {
    id: "H1-B",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/H1-B/playlist.m3u8'
    },
    name: 'Shotta',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H1-B-COIN",
            triggerTime: 22,
            runEvent: () => {
                useGameGlobalsStore.getState().addCoinsAndCheckWin(1);
            },
        },
        {
            name: "H1-B-END",
            triggerTime: 26,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H1B;