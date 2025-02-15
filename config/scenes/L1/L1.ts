import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const L1: SceneObject = {
    id: "L1",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/2747c5fe01e96e9b16c7379fc0368924/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/UBLIXrNIhgvyLaxKa7DTnwSig5kAHTMKVYMtyP3MT0000.m3u8' // Mux
        mux: 'https://klockworks.xyz/L1/playlist.m3u8'
    },
    name: 'Lämnas kvar på krogen',
    nextScenes: [],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "L1-END",
            triggerTime: 11,
            runEvent: () => {
                console.log("L1-END");
                useGameGlobalsStore.getState().endGame();
            },
        }
    ]
}

export default L1;