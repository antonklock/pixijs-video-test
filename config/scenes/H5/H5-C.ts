import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import hitboxIsActive from "@/utils/hitboxActiveCheck";

const H5C: SceneObject = {
    id: "H5-C",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/001fe21e6520b4e5115b75481e8455e4/manifest/video.m3u8',
        mux: 'https://stream.mux.com/R7J6U02xLicvHhHylxPTGjLJduJO6eQG8tEKBunEt8ow.m3u8'
    },
    name: 'Ta bandkassan',
    nextScenes: ["G0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-G0",
            color: 0x4c1b7d,
            x: 0.2,
            y: 0.2,
            width: 0.1,
            height: 0.2,
            onHit: () => {
                if (hitboxIsActive("HB-H5-C")) useGameGlobalsStore.getState().switchToScene("G0");
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
            name: "H5-C-END",
            triggerTime: 22,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("G0");
            },
            hasRun: false
        }
    ]
}

export default H5C;