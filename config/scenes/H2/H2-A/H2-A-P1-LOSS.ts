import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { SceneObject } from "@/types";
import determineHub from "@/utils/determineHub";
import useGameSessionStore from "@/stores/gameSession/gameSession";

const H2AP1Loss: SceneObject = {
    id: "H2-A-P1-LOSS",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
        mux: 'https://stream.mux.com/J7v02Z3X4iy44RhJU0101AP41qLqF0161zPy6Q3xSigDCBs.m3u8'
    },
    name: 'Spelare rullar tärning - 2',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H2-A-P1-LOSS-END",
            triggerTime: 12,
            runEvent: () => {
                const hub = determineHub();
                console.log("Hub: ", hub);
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H2AP1Loss;