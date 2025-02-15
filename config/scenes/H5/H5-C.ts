import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H5C: SceneObject = {
    id: "H5-C",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/001fe21e6520b4e5115b75481e8455e4/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/R7J6U02xLicvHhHylxPTGjLJduJO6eQG8tEKBunEt8ow.m3u8' // Mux
        mux: 'https://klockworks.xyz/H5-C/playlist.m3u8' // R2
    },
    name: 'Ta bandkassan',
    nextScenes: ["G0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H5-C-END",
            triggerTime: 22,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("G0");
            },
        }
    ]
}

export default H5C;