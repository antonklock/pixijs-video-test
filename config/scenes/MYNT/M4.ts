import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const M4: SceneObject = {
    id: "M4",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/M4/playlist.m3u8'
    },
    name: '4 Coins',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "M4-END",
            triggerTime: 2,
            runEvent: () => {
                console.log("M4-END");
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default M4;