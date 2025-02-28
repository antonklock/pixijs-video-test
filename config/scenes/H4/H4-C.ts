import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import determineHub from "@/utils/determineHub";
import hitboxIsActive from "@/utils/hitboxActiveCheck";

const H4C: SceneObject = {
    id: "H4-C",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H4-C/playlist.m3u8' // R2
    },
    name: 'Dricka öl',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H4-C-END",
            triggerTime: 10,
            runEvent: () => {
                const hub = determineHub();
                console.log("Hub: ", hub);
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H4C;