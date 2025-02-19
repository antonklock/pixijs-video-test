import removeHitboxById from "@/PixiJs/removeHitbox";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { SceneObject } from "@/types";

const H2B: SceneObject = {
    id: "H2-B",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H2-B/playlist.m3u8' // R2
    },
    name: 'Välter ljus',
    nextScenes: ["H2-B-1", "H2-B-2", "H2-B-3"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-H2-B-1",
            color: 0x466918,
            x: 0.5,
            y: 0.5,
            width: 0.2,
            height: 0.2,
            onHit: () => {
                if (hitboxIsActive("HB-H2-B-1")) useGameGlobalsStore.getState().switchToScene("H2-B-1");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 9,
                end: 11
            }]
        },
        {
            name: "HB-H2-B-2",
            color: 0x69181b,
            x: 0.7,
            y: 0.4,
            width: 0.05,
            height: 0.2,
            onHit: () => {
                if (hitboxIsActive("HB-H2-B-2")) {
                    useGameGlobalsStore.getState().switchToScene("H2-B-2");
                    useGameGlobalsStore.getState().setGameState("won");
                }
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 9.5,
                end: 11
            }]
        },
        {
            name: "HB-H2-B-3",
            color: 0x69181b,
            x: 0.5,
            y: 0.5,
            width: 0.2,
            height: 0.2,
            onHit: () => {
                if (hitboxIsActive("HB-H2-B-3")) useGameGlobalsStore.getState().switchToScene("H2-B-3");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 7.5,
                end: 9
            }]
        }
    ],
    sceneEvents: [
        {
            name: "H2-B-2-REMOVE-HITBOX",
            triggerTime: 9,
            runEvent: () => {
                removeHitboxById("HB-H2-B-3");
            },
        },
        {
            name: "H2-B-3-END",
            triggerTime: 16,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H2B;     