import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import hitboxIsActive from "@/utils/hitboxActiveCheck";

const H4: SceneObject = {
    id: "H4",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/307bbb62ad743bdd735e8c8c3c585db9/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/U3LFixVH9VTTCbC9fscswacz970032bYisYAhVCyl01C8.m3u8' // Mux
        mux: 'https://klockworks.xyz/H4/playlist.m3u8' // R2
    },
    name: 'Stjäla',
    nextScenes: ["H4-A", "H4-B", "H4-C"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-H4-A",
            color: 0x70215e,
            x: 0.7,
            y: 0.73,
            width: 0.2,
            height: 0.3,
            onHit: () => {
                if (hitboxIsActive("HB-H4-A")) useGameGlobalsStore.getState().switchToScene("H4-A");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 2,
                end: 99999
            }]
        },
        {
            name: "HB-H4-B",
            color: 0x5e34eb,
            x: 0.3,
            y: 0.53,
            width: 0.15,
            height: 0.25,
            onHit: () => {
                if (hitboxIsActive("HB-H4-B")) useGameGlobalsStore.getState().switchToScene("H4-B");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 2,
                end: 99999
            }]
        },
        {
            name: "HB-H4-C",
            color: 0x5effeb,
            x: 0.48,
            y: 0.65,
            width: 0.15,
            height: 0.25,
            onHit: () => {
                if (hitboxIsActive("HB-H4-C")) useGameGlobalsStore.getState().switchToScene("H4-C");
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
            name: "H4-END",
            triggerTime: 53,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            },
        }
    ]
}

export default H4;
