import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const M8: SceneObject = {
    id: "M8",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/M8/playlist.m3u8'
    },
    name: '8 Coins',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "M8-END",
            triggerTime: 2,
            runEvent: () => {
                // console.log("M8-END");
                useGameGlobalsStore.getState().switchToScene("H0", false);
            },
        }
    ]
}

export default M8;