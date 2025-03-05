import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const M9: SceneObject = {
    id: "M9",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/M9/playlist.m3u8'
    },
    name: '9 Coins',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "M9-END",
            triggerTime: 2,
            runEvent: () => {
                // console.log("M9-END");
                useGameGlobalsStore.getState().switchToScene("H0", false);
            },
        }
    ]
}

export default M9;