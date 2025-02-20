import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { SceneObject } from "@/types";
import getNextDiceScene from "@/utils/getNextDiceScene";

const H2AO1: SceneObject = {
    id: "H2-A-O1",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/H2-A-O1/playlist.m3u8'
    },
    name: 'Motståndare rullar tärning - 3',
    nextScenes: [],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-H2-A-O1",
            color: 0x00ffff,
            x: 0.5,
            y: 0.6,
            width: 0.2,
            height: 0.5,
            onHit: () => {
                if (hitboxIsActive("HB-H2-A-O1")) {
                    const nextScene = getNextDiceScene();
                    if (nextScene) useGameGlobalsStore.getState().switchToScene(nextScene);
                }
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 4.5,
                end: 100
            }]
        }
    ],
    sceneEvents: [
        {
            name: "H2-A-O1-END",
            triggerTime: 28,
            runEvent: () => {
                const nextScene = getNextDiceScene();
                if (nextScene) useGameGlobalsStore.getState().switchToScene(nextScene);
            },
        }
    ]
}

export default H2AO1;