import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import useFxStore from "@/stores/FX/fxStore";
import addEndMessage from "@/PixiJs/addEndMessage";
import { fadeOutMusic } from "@/utils/fadeMusic";

const L2: SceneObject = {
    id: "L2",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/G0/playlist.m3u8'
    },
    name: 'Intro sovrum',
    nextScenes: [],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "L2-END",
            triggerTime: 17.25 + 2,
            runEvent: () => {
                useFxStore.getState().fadeToBlack(2000);
            }
        },
        {
            name: "L2-END-MESSAGE",
            triggerTime: 17.25 + 3,
            runEvent: () => {
                addEndMessage("lose", 5);
                const musicPlayer = document.getElementById("game-music") as HTMLAudioElement;
                if (musicPlayer) {
                    fadeOutMusic(musicPlayer, 1, 0, 5000);
                }
            }
        },
        {
            name: "L2-END-GAME",
            triggerTime: 17.25 + 5,
            runEvent: () => {
                useGameGlobalsStore.getState().currentScene?.video.player?.pause();
                setTimeout(() => {
                    useGameGlobalsStore.getState().endGame();
                }, 6000);
            }
        },
    ]
}

export default L2;