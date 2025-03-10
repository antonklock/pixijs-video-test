import useWrestlingStore from "@/stores/wrestling/wrestlingStore";
import { SceneObject } from "@/types";

const H3A: SceneObject = {
    id: "H3-A",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H3-A/playlist.m3u8' // R2
    },
    name: 'Klicka snabbt för att bryta arm',
    nextScenes: ["H3-A-WIN", "H3-A-LOSS", "H3-A-1", "H3-A-2", "H3-A-3"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [
        {
            name: "HB-H3-A-1",
            color: 0x70215e,
            x: 0.5,
            y: 0.5,
            width: 0.8,
            height: 0.8,
            onHit: () => {
                const gameStarted = useWrestlingStore.getState().wrestlingStarted;
                if (!gameStarted) {
                    useWrestlingStore.getState().resetGame();
                    useWrestlingStore.getState().startGame();
                }

                useWrestlingStore.getState().onClick();
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 0,
                end: 99999
            }]
        },
    ],
    sceneEvents: [
        {
            name: "H3-WRESTLING-START",
            triggerTime: 5,
            runEvent: () => {
                const gameStarted = useWrestlingStore.getState().wrestlingStarted;
                if (!gameStarted) {
                    useWrestlingStore.getState().resetGame();
                    useWrestlingStore.getState().startGame();
                }

                useWrestlingStore.getState().onClick();
            }
        }
    ]
}

export default H3A;