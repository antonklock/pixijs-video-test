import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H1A1: SceneObject = {
    id: "H1-A-1",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/36597fa6c0bf1a5820b712e1e832cf8f/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/cLZvm9Cue6iqHFP3tkImW01jNIyTH02XPMrsRarh1zwII.m3u8' // Mux
        mux: 'https://klockworks.xyz/H1-A-1/playlist.m3u8' // R2
    },
    name: 'Hitta mynt i kräks',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H1-A-1-COIN",
            triggerTime: 6,
            runEvent: () => {
                useGameGlobalsStore.getState().setCoins(useGameGlobalsStore.getState().coins + 1);
            },
        },
        {
            name: "H1-A-1-END",
            triggerTime: 8,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H1A1;