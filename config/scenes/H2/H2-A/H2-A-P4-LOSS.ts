import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { SceneObject } from "@/types";

const H2AP4Loss: SceneObject = {
    id: "H2-A-P4-LOSS",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
        mux: 'https://stream.mux.com/i983yJasoq5B600Ub1nMwA5pLVmF02HvRRLo4OMmPfAJo.m3u8'
    },
    name: 'Spelare rullar tärning - 8',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-H0",
            color: 0x00ffff,
            x: 0.5,
            y: 0.5,
            width: 0.2,
            height: 0.2,
            onHit: () => {
                if (hitboxIsActive("HB-H0")) useGameGlobalsStore.getState().switchToScene("H0");
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
            name: "H2-A-P4-LOSS-END",
            triggerTime: 12,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
            hasRun: false
        }
    ]
}

export default H2AP4Loss;   