import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H2B1: SceneObject = {
    id: "H2-B-1",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H2-B-1/playlist.m3u8' // R2
    },
    name: 'Ta ett mynt - Lyckas',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H2-B-1-COIN",
            triggerTime: 3,
            runEvent: () => {
                useGameGlobalsStore.getState().addCoinsAndCheckWin(1);
            },
        },
        {
            name: "H2-B-1-END",
            triggerTime: 5,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H2B1;
