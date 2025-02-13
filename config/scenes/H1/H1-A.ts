import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { SceneObject } from "@/types";

const H1A: SceneObject = {
    id: "H1-A",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/36597fa6c0bf1a5820b712e1e832cf8f/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/cLZvm9Cue6iqHFP3tkImW01jNIyTH02XPMrsRarh1zwII.m3u8' // Mux
        mux: 'https://klockworks.xyz/H1-A/playlist.m3u8' // R2
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