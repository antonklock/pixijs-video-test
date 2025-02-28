import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const M3: SceneObject = {
    id: "M3",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/M3/playlist.m3u8'
    },
    name: '3 Coins',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "M3-END",
            triggerTime: 2,
            runEvent: () => {
                // console.log("M3-END");
                useGameGlobalsStore.getState().switchToScene("H0", false);
            },
        }
    ]
}

export default M3;