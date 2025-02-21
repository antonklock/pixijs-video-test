import addEndMessage from "@/PixiJs/addEndMessage";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const L1: SceneObject = {
    id: "L1",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/L1/playlist.m3u8'
    },
    name: 'Lämnas kvar på krogen',
    nextScenes: [],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "L1-END-MESSAGE",
            triggerTime: 7,
            runEvent: () => {
                addEndMessage("lose", 5);
            }
        },
        {
            name: "L1-END",
            triggerTime: 8,
            runEvent: () => {
                useGameGlobalsStore.getState().currentScene?.video.player?.pause();
                setTimeout(() => {
                    useGameGlobalsStore.getState().endGame();
                }, 7000);
            },
        }
    ]
}

export default L1;