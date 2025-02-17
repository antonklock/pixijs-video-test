import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import hitboxIsActive from "@/utils/hitboxActiveCheck";

const H3: SceneObject = {
    id: "H3",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H3/playlist.m3u8' // R2
    },
    name: 'Armbrytning',
    nextScenes: ["H3-A", "H3-B"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-H3-A",
            color: 0x70215e,
            x: 0.45,
            y: 0.55,
            width: 0.2,
            height: 0.45,
            onHit: () => {
                if (hitboxIsActive("HB-H3-A")) useGameGlobalsStore.getState().switchToScene("H3-A");
            },
            activationIntervals: [{
                start: 2,
                end: 99999
            }],
        },
        {
            name: "HB-H3-B",
            color: 0x70215e,
            x: 0.65,
            y: 0.8,
            width: 0.2,
            height: 0.2,
            onHit: () => {
                if (hitboxIsActive("HB-H3-B")) useGameGlobalsStore.getState().switchToScene("H3-B");
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
            name: "H3-END",
            triggerTime: 15,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H3;