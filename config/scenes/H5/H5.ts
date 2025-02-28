import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import hitboxIsActive from "@/utils/hitboxActiveCheck";

const H5: SceneObject = {
    id: "H5",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H5/playlist.m3u8' // R2
    },
    name: 'Buskspel',
    nextScenes: ["H5-A", "H5-B", "H5-C"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-H5-A",
            color: 0x4c1b7d,
            x: 0.6,
            y: 0.5,
            width: 0.3,
            height: 0.6,
            onHit: () => {
                if (hitboxIsActive("HB-H5-A")) useGameGlobalsStore.getState().switchToScene("H5-A");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 3,
                end: 99999
            }]
        },
        {
            name: "HB-H5-B",
            color: 0x5c7d1b,
            x: 0.9,
            y: 0.5,
            width: 0.25,
            height: 0.6,
            onHit: () => {
                if (hitboxIsActive("HB-H5-B")) useGameGlobalsStore.getState().switchToScene("H5-B");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 3,
                end: 99999
            }]
        },
        {
            name: "HB-H5-C",
            color: 0x5c7d1b,
            x: 0.3,
            y: 0.5,
            width: 0.2,
            height: 0.4,
            onHit: () => {
                if (hitboxIsActive("HB-H5-C")) useGameGlobalsStore.getState().switchToScene("H5-C");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 3,
                end: 99999
            }]
        }
    ],
    sceneEvents: [
        {
            name: "H5-C-END",
            triggerTime: 45,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H5;