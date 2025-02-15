import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import determineHub from "@/utils/determineHub";

const H2AP2Loss: SceneObject = {
    id: "H2-A-P2-LOSS",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/DcEsGlvsOP5skN7DwCfd9E2n8WtAe48rOXzGCpEGuto.m3u8' // Mux
        mux: 'https://klockworks.xyz/H2-A-P2-LOSS/playlist.m3u8' // R2
    },
    name: 'Spelare rullar tärning - 5',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H2-A-P2-LOSS-END",
            triggerTime: 12,
            runEvent: () => {
                const hub = determineHub();
                console.log("Hub: ", hub);
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H2AP2Loss;