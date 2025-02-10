import { SceneObject } from "@/types";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

const H5B: SceneObject = {
    id: "H5-B",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/699da2dd3426b36a3a92bca1d7385e6c/manifest/video.m3u8',
        mux: 'https://stream.mux.com/ZrK2Xh1G8ru8vGhpOgFISjcdAlHxKA7PPD00IfaA4Gzc.m3u8'
    },
    name: 'Ta fiolen',
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
            name: "H5-B-END",
            triggerTime: 10,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H5B;