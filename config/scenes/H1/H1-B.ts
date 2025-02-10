import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { SceneObject } from "@/types";

const H1B: SceneObject = {
    id: "H1-B",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/30cbfd2e855a15fc730e5b47553dc726/manifest/video.m3u8',
        mux: 'https://stream.mux.com/65wvSj2URoDc28hJTMGgxHkyahCFjL018EOk3y4qmZ4I.m3u8'
    },
    name: 'Shotta',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [{
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
            end: 99999
        }]
    }],
    sceneEvents: [
        {
            name: "H1-B-END",
            triggerTime: 26,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
            hasRun: false
        }
    ]
}

export default H1B;