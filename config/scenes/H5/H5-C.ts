import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H5C: SceneObject = {
    id: "H5-C",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H5-C/playlist.m3u8' // R2
    },
    name: 'Ta bandkassan',
    nextScenes: ["L2"],
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
                useGameGlobalsStore.getState().switchToScene("L2");
            },
        }
    ]
}

export default H5C;