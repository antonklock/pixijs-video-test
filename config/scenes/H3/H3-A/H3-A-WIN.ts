import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H3AWin: SceneObject = {
    id: "H3-A-WIN",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/c3f5830f8398a2c2218278b0a47b0ab8/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/01uz00vOk3dL47MSelg2yz00umS8JbBAZgd2Ywm4T75EnE.m3u8' // Mux
        mux: 'https://klockworks.xyz/H3-A-WIN/playlist.m3u8' // R2
    },
    name: 'Armbrytning - Vinner',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H3-A-WIN-COIN",
            triggerTime: 6,
            runEvent: () => {
                useGameGlobalsStore.getState().addCoinsAndCheckWin(1);
            },
        },
        {
            name: "H3-A-WIN-END",
            triggerTime: 8,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H3AWin;