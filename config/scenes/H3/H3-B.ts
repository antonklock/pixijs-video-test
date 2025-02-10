import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
const H3B: SceneObject = {
    id: "H3-B",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/db8497398d929262ea657cc711030905/manifest/video.m3u8',
        mux: 'https://stream.mux.com/k6DFX022X00f7NebiYX6x3i1x4ZoGtpga4Euz01Cv6b93k.m3u8'
    },
    name: 'Spelaren förlorar',
    nextScenes: ["G0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H3-B-END",
            triggerTime: 6,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("G0");
            },
        }
    ]
}

export default H3B;