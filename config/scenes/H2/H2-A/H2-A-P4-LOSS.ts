import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H2AP4Loss: SceneObject = {
    id: "H2-A-P4-LOSS",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/i983yJasoq5B600Ub1nMwA5pLVmF02HvRRLo4OMmPfAJo.m3u8' // Mux
        mux: 'https://klockworks.xyz/H2-A-P4-LOSS/playlist.m3u8' // R2
    },
    name: 'Spelare rullar tärning - 8',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H2-A-P4-LOSS-END",
            triggerTime: 12,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H2AP4Loss;   