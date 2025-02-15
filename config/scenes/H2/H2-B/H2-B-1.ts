import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H2B1: SceneObject = {
    id: "H2-B-1",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/23a7a44d0b80ba678a6ac03759a43a8c/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/Hf7nWh9ZoJgogfprtDK5hlQ02eXZbJ2qJCsWd4RZ00Jck.m3u8' // Mux
        mux: 'https://klockworks.xyz/H2-B-1/playlist.m3u8' // R2
    },
    name: 'Ta ett mynt - Lyckas',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H2-B-1-COIN",
            triggerTime: 3,
            runEvent: () => {
                useGameGlobalsStore.getState().addCoinsAndCheckWin(1);
            },
        },
        {
            name: "H2-B-1-END",
            triggerTime: 6,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H2B1;
