import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H2AP5Loss: SceneObject = {
    id: "H2-A-P5-LOSS",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H2-A-P5-LOSS/playlist.m3u8' // R2
    },
    name: 'Spelare rullar tärning - 11',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H2-A-P5-LOSS-END",
            triggerTime: 12,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H2AP5Loss;
