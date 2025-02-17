import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H2AP4Win: SceneObject = {
    id: "H2-A-P4-WIN",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H2-A-P4-WIN/playlist.m3u8' // R2
    },
    name: 'Spelare rullar tärning - 8',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H2-A-P4-WIN-END",
            triggerTime: 12,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H2AP4Win;