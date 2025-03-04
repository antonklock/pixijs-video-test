import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import useGameSessionStore from "@/stores/gameSession/gameSession";
import { SceneObject } from "@/types";
import determineHub from "@/utils/determineHub";

const H1A1: SceneObject = {
    id: "H1-A-1",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/H1-A-1/playlist.m3u8'
    },
    name: 'Hitta mynt i kräks',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H1-A-1-COIN",
            triggerTime: 5,
            runEvent: () => {
                useGameGlobalsStore.getState().addCoinsAndCheckWin(1);
            },
        },
        {
            name: "H1-A-1-END",
            triggerTime: 4.5,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H1A1;