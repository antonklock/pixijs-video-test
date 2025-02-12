import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import hitboxIsActive from "@/utils/hitboxActiveCheck";

const H4A: SceneObject = {
    id: "H4-A",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/e6013c545482ee6322457767a0ee39ae/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/OgjZWdscuZk7SihdY02HvssVLBjvJlaa3BegMkgvzBmQ.m3u8' // Mux
        mux: 'https://klockworks.xyz/H4-A/playlist.m3u8' // R2
    },
    name: 'Ta pengar - Lyckas',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H4-A-COIN",
            triggerTime: 8.5,
            runEvent: () => {
                useGameGlobalsStore.getState().addCoinsAndCheckWin(1);
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