import addEndMessage from "@/PixiJs/addEndMessage";
import useFxStore from "@/stores/FX/fxStore";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H2B2: SceneObject = {
    id: "H2-B-2",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H2-B-2/playlist.m3u8' // R2
    },
    name: 'Spring mot dörren',
    nextScenes: ["H2-B-2-A", "H2-B-2-B"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H2-B-2-MESSAGE",
            triggerTime: 7,
            runEvent: () => {
                addEndMessage("sneek", 8);
            }
        },
        {
            name: "H2-B-2-END",
            triggerTime: 50,
            runEvent: () => {
                useFxStore.getState().fadeToBlack(4000);
                useFxStore.getState().fadeMusicVolume(-50, 4000);

                setTimeout(() => {
                    addEndMessage("win", 5);
                }, 1000);

                setTimeout(() => {
                    useGameGlobalsStore.getState().endGame();
                }, 7000);
            }
        }
    ]
}

export default H2B2;
