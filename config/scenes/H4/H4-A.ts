import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import hitboxIsActive from "@/utils/hitboxActiveCheck";

const H4A: SceneObject = {
    id: "H4-A",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/e6013c545482ee6322457767a0ee39ae/manifest/video.m3u8',
        mux: 'https://stream.mux.com/OgjZWdscuZk7SihdY02HvssVLBjvJlaa3BegMkgvzBmQ.m3u8'
    },
    name: 'Ta pengar - Lyckas',
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
            name: "H4-A-COIN",
            triggerTime: 8.5,
            runEvent: () => {
                useGameGlobalsStore.getState().setCoins(useGameGlobalsStore.getState().coins + 1);
            },
        },
        {
            name: "H4-A-END",
            triggerTime: 10,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H4A;