import addEndMessage from "@/PixiJs/addEndMessage";
import fxStore from "@/stores/FX/fxStore";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";

const H6B: SceneObject = {
    id: "H6-B",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H6-B/playlist.m3u8' // R2
    },
    name: 'Får passera',
    nextScenes: [],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [],
    sceneEvents: [
        {
            name: "H6-B-MESSAGE",
            triggerTime: 21,
            runEvent: async () => {
                addEndMessage("win", 10);
            }
        },
        {
            name: "H6-B-END",
            triggerTime: 73,
            runEvent: async () => {
                fxStore.getState().fadeMusicVolume(-50, 5000);
                const currentVideo = useGameGlobalsStore.getState().currentScene?.video.player;

                // TODO: Fix fade out of music
                // const gameMusic = useGameGlobalsStore.getState().musicPlayer;
                // if (gameMusic) {
                //     const volume = gameMusic.volume();
                //     gameMusic.fade(1, 0, 5000);
                // }

                const videoPlayers = document.querySelectorAll('video');
                videoPlayers.forEach((videoPlayer) => {
                    if (videoPlayer !== currentVideo) {
                        videoPlayer.style.opacity = "0";
                        videoPlayer.pause();
                    }
                });

                if (currentVideo) {
                    const fadeOutDuration = 5000;
                    const startTime = performance.now();
                    const initialOpacity = 1;

                    const fadeOut = (currentTime: number) => {
                        const elapsed = currentTime - startTime;
                        const t = Math.min(elapsed / fadeOutDuration, 1);
                        const opacity = initialOpacity * (1 - t);
                        currentVideo.style.opacity = String(opacity);

                        if (t < 1) {
                            requestAnimationFrame(fadeOut);
                        } else {
                            currentVideo.pause();
                        }
                    };

                    requestAnimationFrame(fadeOut);
                }

                setTimeout(() => {
                    useGameGlobalsStore.getState().endGame();
                }, 5000);
            }
        }
    ]
}

export default H6B;