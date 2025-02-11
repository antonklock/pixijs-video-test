import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { SceneObject } from "@/types";

const H1C: SceneObject = {
    id: "H1-C",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/862fd9f600910ac44835de3033d851b4/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/avMTA9Mi8qyIWpniz00hu3U4TZNi8td02V02nXAxnZiAeI.m3u8' // Mux
        mux: 'https://klockworks.xyz/H1-C/playlist.m3u8' // R2
    },
    name: 'Tvätta bandet',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H1-C-END",
            triggerTime: 18,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H1C;