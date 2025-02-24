import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import * as PIXI from "pixi.js";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { SceneObject } from "@/types";
import { fadeInMusic } from "@/utils/fadeMusic";
import { fadeOutMusic } from "@/utils/fadeMusic";

const G0: SceneObject = {
    id: "G0",
    source: {
        cloudflare: '',
        mux: '',
        R2: 'https://klockworks.xyz/G0/playlist.m3u8'
    },
    name: 'Intro sovrum',
    nextScenes: ['H0'],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [{
        name: "HB-H0",
        color: 0x00ff00,
        x: 0.8,
        y: 0.75,
        width: 0.15,
        height: 0.1,
        onHit: () => {
            const skipIntro = useGameGlobalsStore.getState().app.stage.children.find((child: PIXI.Sprite) => child.label === "skip-intro");
            if (skipIntro) skipIntro.destroy();

            if (hitboxIsActive("HB-H0")) {
                useGameGlobalsStore.getState().switchToScene("H0");
                // useGameGlobalsStore.getState().musicPlayer?.seek(65);
                const musicPlayer = document.getElementById("game-music") as HTMLAudioElement;
                if (musicPlayer) {
                    musicPlayer.currentTime = 65;
                }
            }

        },
        isLoaded: false,
        isActive: false,
        activationIntervals: [{
            start: 2,
            end: 999999
        }]
    }],
    sceneEvents: [
        {
            name: "set-skip-intro",
            triggerTime: 20,
            runEvent: () => {
                localStorage.setItem("shouldDisplaySkip", "true");
            }
        },
        {
            name: "intro-end",
            triggerTime: 69,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            }
        }
    ]
}

export default G0;