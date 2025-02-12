import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import * as PIXI from "pixi.js";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { SceneObject } from "@/types";
import useGameSessionStore from "@/stores/gameSession/gameSession";
import determineHub from "@/utils/determineHub";

const G0: SceneObject = {
    id: "G0",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/f63d15e200eb568dfef34b3b6696a761/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/SbcBoRA74N8PM0291B9YSRHsBkbR2eyXObPCel4JBNYA.m3u8' // Mux
        mux: 'https://klockworks.xyz/G0/playlist.m3u8' // Custom R2 domain
        // mux: 'https://pub-3d195669b2f149b99b13aeea19bd7cfa.r2.dev/G0/playlist.m3u8' // Cloudflare R2.dev
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
        height: 0.075,
        onHit: () => {
            const skipIntro = useGameGlobalsStore.getState().app.stage.children.find((child: PIXI.Sprite) => child.label === "skip-intro");
            if (skipIntro) skipIntro.destroy();

            const hub = determineHub();
            console.log("Hub: ", hub);

            if (hitboxIsActive("HB-H0")) useGameGlobalsStore.getState().switchToScene("H0")
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
            name: "intro-end",
            triggerTime: 70.5,
            runEvent: () => {
                useGameGlobalsStore.getState().switchToScene("H0");
            }
        }
    ]
}

export default G0;