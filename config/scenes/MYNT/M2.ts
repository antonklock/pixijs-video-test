import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const M2: SceneObject = {
    id: "M2",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/M2/playlist.m3u8'
    },
    name: '2 Coins',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "M2-END",
            triggerTime: 1.5,
            runEvent: () => {
                console.log("M2-END");
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default M2;