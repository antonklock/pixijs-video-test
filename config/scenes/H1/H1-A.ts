import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { SceneObject } from "@/types";
import determineHub from "@/utils/determineHub";

const H1A: SceneObject = {
    id: "H1-A",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/H1-A/playlist.m3u8'
    },
    name: 'Skura golvet',
    nextScenes: ["H1-A-1"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [{
        name: "H1-A-1",
        color: 0xff00ff,
        x: 0.55,
        y: 0.38,
        width: 0.17,
        height: 0.2,
        onHit: () => {
            if (hitboxIsActive("H1-A-1")) useGameGlobalsStore.getState().switchToScene("H1-A-1");
        },
        isLoaded: false,
        isActive: false,
        activationIntervals: [{
            start: 11,
            end: 99999
        }]
    }],
    sceneEvents: [
        {
            name: "H1-A-END",
            triggerTime: 13,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H1A;