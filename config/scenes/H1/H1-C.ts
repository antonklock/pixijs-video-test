import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import useFxStore from "@/stores/FX/fxStore";
import { SceneObject } from "@/types";

const H1C: SceneObject = {
    id: "H1-C",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/H1-C/playlist.m3u8'
    },
    name: 'Tvätta bandet',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H1-C-END",
            triggerTime: 18,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H1C;