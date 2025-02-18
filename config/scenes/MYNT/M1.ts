import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const M1: SceneObject = {
    id: "M1",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/M1/playlist.m3u8'
    },
    name: '1 Coin',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "M1-END",
            triggerTime: 2.5,
            runEvent: () => {
                console.log("M1-END");
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default M1;