import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const M7: SceneObject = {
    id: "M7",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/M7/playlist.m3u8'
    },
    name: '7 Coins',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "M7-END",
            triggerTime: 2,
            runEvent: () => {
                // console.log("M7-END");
                useGameGlobalsStore.getState().switchToScene("H0", false);
            },
        }
    ]
}

export default M7;