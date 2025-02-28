import addEndMessage from "@/PixiJs/addEndMessage";
import useFxStore from "@/stores/FX/fxStore";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import useGameSessionStore from "@/stores/gameSession/gameSession";
import { saveGameSessionFromClient } from "@/stores/gameSession/saveGameSessionFromClient";
import { SceneObject } from "@/types";
import { fadeOutMusic } from "@/utils/fadeMusic";

const L1: SceneObject = {
    id: "L1",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/L1/playlist.m3u8'
    },
    name: 'Lämnas kvar på krogen',
    nextScenes: [],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "L1-END-MESSAGE",
            triggerTime: 7,
            runEvent: () => {
                addEndMessage("lose", 5);
                const musicPlayer = useGameGlobalsStore.getState().musicPlayer;
                if (musicPlayer) {
                    fadeOutMusic(musicPlayer, 1, 0, 5000);
                } else {
                    console.warn("Game music not found");
                }
            }
        },
        {
            name: "L1-END",
            triggerTime: 8,
            runEvent: () => {
                useGameGlobalsStore.getState().currentScene?.video.player?.pause();

                const sessionLength = useGameSessionStore.getState().session.length;
                const newSession = useGameSessionStore.getState().session;
                newSession[sessionLength - 1].timeEnded = new Date();
                useGameSessionStore.setState({
                    session: newSession
                });

                const gameSession = useGameSessionStore.getState();
                saveGameSessionFromClient(gameSession);

                setTimeout(() => {
                    useGameGlobalsStore.getState().endGame();
                }, 7000);
            },
        }
    ]
}

export default L1;