import { SceneObject } from "@/types";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

const H5A: SceneObject = {
    id: "H5-A",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/adde7459836d6af2a084852391c8be13/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/HCpSHliCBiRlWNqdHaXByNaGi34zvWewAEmZs1Uhm4c.m3u8' // Mux
        mux: 'https://klockworks.xyz/H5-A/playlist.m3u8' // R2
    },
    name: 'Ta lutan',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H5-A-COIN",
            triggerTime: 25,
            runEvent: () => {
                useGameGlobalsStore.getState().addCoinsAndCheckWin(1);
            },
        },
        {
            name: "H5-A-END",
            triggerTime: 26,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H5A;