import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H6A: SceneObject = {
    id: "H6-A",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/2747c5fe01e96e9b16c7379fc0368924/manifest/video.m3u8',
        mux: 'https://stream.mux.com/UBLIXrNIhgvyLaxKa7DTnwSig5kAHTMKVYMtyP3MT0000.m3u8'
    },
    name: 'Stoppas i dörren. "Betala tre mynt!"',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H6-A-END",
            triggerTime: 4,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
            hasRun: false
        }
    ]
}

export default H6A;