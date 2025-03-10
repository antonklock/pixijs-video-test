import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { SceneObject } from "@/types";

const H1: SceneObject = {
    id: "H1",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/H1/playlist.m3u8'
    },
    name: 'Hederligt arbete',
    nextScenes: ["H1-A", "H1-B", "H1-C"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-H1-A",
            color: 0x43104a,
            x: 0.5,
            y: 0.5,
            width: 0.2,
            height: 0.7,
            onHit: () => {
                if (hitboxIsActive("HB-H1-A")) useGameGlobalsStore.getState().switchToScene("H1-A");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 3,
                end: 9999999
            }]
        },
        {
            name: "HB-H1-B",
            color: 0x104a23,
            x: 0.25,
            y: 0.65,
            width: 0.2,
            height: 0.33,
            onHit: () => {
                if (hitboxIsActive("HB-H1-B")) useGameGlobalsStore.getState().switchToScene("H1-B");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 3,
                end: 9999999
            }]
        },
        {
            name: "HB-H1-C",
            color: 0x0d124a,
            x: 0.75,
            y: 0.5,
            width: 0.2,
            height: 0.7,
            onHit: () => {
                if (hitboxIsActive("HB-H1-C")) useGameGlobalsStore.getState().switchToScene("H1-C");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 3,
                end: 9999999
            }]
        }
    ],
    sceneEvents: [
        {
            name: "H1-END",
            triggerTime: 44,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            }
        }
    ]
}

export default H1;