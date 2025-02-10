import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import hitboxIsActive from "@/utils/hitboxActiveCheck";

const H3AWin: SceneObject = {
    id: "H3-A-WIN",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/c3f5830f8398a2c2218278b0a47b0ab8/manifest/video.m3u8',
        mux: 'https://stream.mux.com/01uz00vOk3dL47MSelg2yz00umS8JbBAZgd2Ywm4T75EnE.m3u8'
    },
    name: 'Armbrytning - Vinner',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-H0",
            color: 0x70215e,
            x: 0.1,
            y: 0.1,
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
            name: "H3-A-LOSS-COIN",
            triggerTime: 6,
            runEvent: () => {
                useGameGlobalsStore.getState().setCoins(useGameGlobalsStore.getState().coins + 1);
            },
            hasRun: false
        },
        {
            name: "H3-A-WIN-END",
            triggerTime: 8,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
            hasRun: false
        }
    ]
}

export default H3AWin;