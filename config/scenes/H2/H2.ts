import { SceneObject } from "@/types";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { getRandomOpponentDiceScene } from "@/utils/randomDiceScenes";
import determineHub from "@/utils/determineHub";
import useGameSessionStore from "@/stores/gameSession/gameSession";

const H2: SceneObject = {
    id: "H2",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H2/playlist.m3u8' // R2
    },
    name: 'Spela tärning',
    nextScenes: ["H2-A", "H2-B"].concat(getRandomOpponentDiceScene()),
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-H2-A",
            color: 0xeb4034,
            x: 0.48,
            y: 0.7,
            width: 0.2,
            height: 0.4,
            onHit: () => {
                const nextScene = useGameGlobalsStore.getState().currentScene?.nextScenes?.[2];
                if (hitboxIsActive("HB-H2-A") && nextScene) useGameGlobalsStore.getState().switchToScene(nextScene);
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 2,
                end: 99999
            }]
        },
        {
            name: "HB-H2-B",
            color: 0x4287f5,
            x: 0.7,
            y: 0.7,
            width: 0.2,
            height: 0.4,
            onHit: () => {
                if (hitboxIsActive("HB-H2-B")) useGameGlobalsStore.getState().switchToScene("H2-B");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 2,
                end: 99999
            }]
        }
    ],
    sceneEvents: [
        {
            name: "H2-B-END",
            triggerTime: 25,
            runEvent: () => {
                const hub = determineHub();
                console.log("Hub: ", hub);
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H2;