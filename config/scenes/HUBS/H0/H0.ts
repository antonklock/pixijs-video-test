import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import { SceneObject } from "@/types";
import { isSceneStarted } from "@/utils/sceneStartedCheck";

const H0: SceneObject = {
    id: "H0",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H0-1/playlist.m3u8' // R2
    },
    name: 'Hub',
    nextScenes: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6-A', 'H6-B'],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: [{
        name: "HB-H1",
        color: 0x5e4613,
        x: 0.11,
        y: 0.4,
        width: 0.15,
        height: 0.45,
        onHit: () => {
            if (hitboxIsActive("HB-H1") && !isSceneStarted("H1")) useGameGlobalsStore.getState().switchToScene("H1");
        },
        isLoaded: false,
        isActive: false,
        activationIntervals: [{
            start: 2,
            end: 99999
        }]
    },
    {
        name: "HB-H2",
        color: 0x415e13,
        x: 0.53,
        y: 0.6,
        width: 0.2,
        height: 0.3,
        onHit: () => {
            if (hitboxIsActive("HB-H2") && !isSceneStarted("H2")) useGameGlobalsStore.getState().switchToScene("H2");
        },
        isLoaded: false,
        isActive: false,
        activationIntervals: [{
            start: 2,
            end: 99999
        }]
    },
    {
        name: "HB-H3",
        color: 0x176644,
        x: 0.78,
        y: 0.6,
        width: 0.15,
        height: 0.3,
        onHit: () => {
            if (hitboxIsActive("HB-H3") && !isSceneStarted("H3")) useGameGlobalsStore.getState().switchToScene("H3");
        },
        isLoaded: false,
        isActive: false,
        activationIntervals: [{
            start: 2,
            end: 99999
        }]
    },
    {
        name: "HB-H4",
        color: 0x174866,
        x: 0.3,
        y: 0.6,
        width: 0.2,
        height: 0.3,
        onHit: () => {
            if (hitboxIsActive("HB-H4") && !isSceneStarted("H4")) useGameGlobalsStore.getState().switchToScene("H4");
        },
        isLoaded: false,
        isActive: false,
        activationIntervals: [{
            start: 2,
            end: 99999
        }]
    },
    {
        name: "HB-H5",
        color: 0x251761,
        x: 0.4,
        y: 0.3,
        width: 0.24,
        height: 0.2,
        onHit: () => {
            if (hitboxIsActive("HB-H5") && !isSceneStarted("H5")) useGameGlobalsStore.getState().switchToScene("H5");
        },
        isLoaded: false,
        isActive: false,
        activationIntervals: [{
            start: 2,
            end: 99999
        }]
    },
    {
        name: "HB-H6",
        color: 0x43104a,
        x: 0.68,
        y: 0.4,
        width: 0.05,
        height: 0.3,
        onHit: () => {
            const coins = useGameGlobalsStore.getState().coins;
            if (coins >= 3) {
                if (hitboxIsActive("HB-H6") && !isSceneStarted("H6-B")) useGameGlobalsStore.getState().switchToScene("H6-B");
                const videoPlayer = useGameGlobalsStore.getState().currentScene?.video?.player;
                if (videoPlayer) videoPlayer.muted = false;
            } else {
                if (hitboxIsActive("HB-H6")) useGameGlobalsStore.getState().switchToScene("H6-A");
            }
        },
        isLoaded: false,
        isActive: false,
        activationIntervals: [{
            start: 2,
            end: 99999
        }]
    }]
}

export default H0;