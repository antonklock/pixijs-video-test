import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import hitboxIsActive from "@/utils/hitboxActiveCheck";

const H4C: SceneObject = {
    id: "H4-C",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/2da5985a1e344594507370843dce6977/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/U9pL6IQ6FanG003eOmDZpGm02DK1g02aDDGKBaJDz5T6QE.m3u8' // Mux
        mux: 'https://klockworks.xyz/H4-C/playlist.m3u8' // R2
    },
    name: 'Dricka öl',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-H0",
            color: 0x70215e,
            x: 0.2,
            y: 0.2,
            width: 0.1,
            height: 0.2,
            onHit: () => {
                if (hitboxIsActive("HB-H0")) useGameGlobalsStore.getState().switchToScene("H0");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 2,
                end: 99999
            }]
        }
    ],
    sceneEvents: [
        {
            name: "H4-C-END",
            triggerTime: 10,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H4C;