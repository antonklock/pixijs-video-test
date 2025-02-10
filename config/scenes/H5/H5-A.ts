import { SceneObject } from "@/types";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

const H5A: SceneObject = {
    id: "H5-A",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/adde7459836d6af2a084852391c8be13/manifest/video.m3u8',
        mux: 'https://stream.mux.com/HCpSHliCBiRlWNqdHaXByNaGi34zvWewAEmZs1Uhm4c.m3u8'
    },
    name: 'Ta lutan',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-H0",
            color: 0x4c1b7d,
            x: 0.2,
            y: 0.2,
            width: 0.1,
            height: 0.2,
            onHit: () => {
                if (hitboxIsActive("HB-H0")) useGameGlobalsStore.getState().switchToScene("H0");
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
            name: "H5-A-COIN",
            triggerTime: 25,
            runEvent: () => {
                useGameGlobalsStore.getState().setCoins(useGameGlobalsStore.getState().coins + 1);
            },
            hasRun: false
        },
        {
            name: "H5-A-END",
            triggerTime: 26,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
            hasRun: false
        }
    ]
}

export default H5A;