import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const M0: SceneObject = {
    id: "M0",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/M0/playlist.m3u8'
    },
    name: '0 Coins',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "M0-END",
            triggerTime: 2.5,
            runEvent: () => {
                console.log("M0-END");
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default M0;