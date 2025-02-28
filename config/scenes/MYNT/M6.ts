import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const M6: SceneObject = {
    id: "M6",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/M6/playlist.m3u8'
    },
    name: '6 Coins',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "M6-END",
            triggerTime: 2,
            runEvent: () => {
                // console.log("M6-END");
                useGameGlobalsStore.getState().switchToScene("H0", false);
            },
        }
    ]
}

export default M6;