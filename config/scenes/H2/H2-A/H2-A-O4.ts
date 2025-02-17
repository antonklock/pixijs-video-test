import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { SceneObject } from "@/types";
import getNextDiceScene from "@/utils/getNextDiceScene";

const H2AO4: SceneObject = {
    id: "H2-A-O4",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H2-A-O4/playlist.m3u8' // R2
    },
    name: 'Motståndare rullar tärning - 8',
    nextScenes: [],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-H2-A-O4",
            color: 0x00ffff,
            x: 0.5,
            y: 0.6,
            width: 0.2,
            height: 0.5,
            onHit: () => {
                const nextScene = getNextDiceScene();

                if (hitboxIsActive("HB-H2-A-O4") && nextScene) useGameGlobalsStore.getState().switchToScene(nextScene);
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 2,
                end: 100
            }]
        }
    ],
    sceneEvents: [
        {
            name: "H2-A-O4-END",
            triggerTime: 28,
            runEvent: () => {
                const nextScene = getNextDiceScene();
                if (nextScene) useGameGlobalsStore.getState().switchToScene(nextScene);
            },
        }
    ]
}

export default H2AO4;