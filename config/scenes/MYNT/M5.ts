import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const M5: SceneObject = {
    id: "M5",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/M5/playlist.m3u8'
    },
    name: '5 Coins',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "M5-END",
            triggerTime: 2,
            runEvent: () => {
                console.log("M5-END");
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default M5;