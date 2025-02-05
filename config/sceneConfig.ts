import { SceneObject } from "@/types";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import useWrestlingStore from "@/stores/wrestling/wrestlingStore";
import hitboxIsActive from "@/utils/hitboxActiveCheck";
import getRandomDiceScenes from "@/utils/randomDiceScenes";

export const sceneObjects: SceneObject[] = [
    {
        id: "G0",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/f63d15e200eb568dfef34b3b6696a761/manifest/video.m3u8',
            mux: 'https://stream.mux.com/6TLRQJ1e2xp02lshfjpBg42DYMdCoLf3MongqkQRUmLo.m3u8'
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
            onHit: () => { if (hitboxIsActive("HB-H0")) useGameGlobalsStore.getState().switchToScene("H0") },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 2,
                end: 999999
            }]
        }]
    },
    {
        id: "H0",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/abf023c6468cc5cedaaf896dd6cade2f/manifest/video.m3u8',
            mux: 'https://stream.mux.com/AZZOFn02NIEGLvAygrAlwBelpLk9mQWvzVm02pROtyFr4.m3u8'
        },
        name: 'Hub',
        nextScenes: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6-A'],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [{
            name: "HB-H1",
            color: 0x5e4613,
            x: 0.11,
            y: 0.5,
            width: 0.15,
            height: 0.50,
            onHit: () => {
                if (hitboxIsActive("HB-H1")) useGameGlobalsStore.getState().switchToScene("H1");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 5,
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
                if (hitboxIsActive("HB-H2")) useGameGlobalsStore.getState().switchToScene("H2");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 1,
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
                if (hitboxIsActive("HB-H3")) useGameGlobalsStore.getState().switchToScene("H3");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 8,
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
                if (hitboxIsActive("HB-H4")) useGameGlobalsStore.getState().switchToScene("H4");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 4,
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
                if (hitboxIsActive("HB-H5")) useGameGlobalsStore.getState().switchToScene("H5");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 12,
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
                if (hitboxIsActive("HB-H6")) useGameGlobalsStore.getState().switchToScene("H6-A");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 6,
                end: 99999
            }]
        }]
    },
    {
        id: "H1",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/51cb3c8b7aec89d2df5aa95981c2a7c0/manifest/video.m3u8',
            mux: 'https://stream.mux.com/9dPejgoesR1zQ1mXs9scd5gHJ34g8Jp00NwnVFFHxmzI.m3u8'
        },
        name: 'Hederligt arbete',
        nextScenes: ["H1-A", "H1-B", "H1-C"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H1-A",
                color: 0x43104a,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.7,
                onHit: () => {
                    if (hitboxIsActive("HB-H1-A")) useGameGlobalsStore.getState().switchToScene("H1-A");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 7,
                    end: 9999999
                }]
            },
            {
                name: "HB-H1-B",
                color: 0x104a23,
                x: 0.25,
                y: 0.65,
                width: 0.2,
                height: 0.33,
                onHit: () => {
                    if (hitboxIsActive("HB-H1-B")) useGameGlobalsStore.getState().switchToScene("H1-B");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 7,
                    end: 9999999
                }]
            },
            {
                name: "HB-H1-C",
                color: 0x0d124a,
                x: 0.75,
                y: 0.5,
                width: 0.2,
                height: 0.7,
                onHit: () => {
                    if (hitboxIsActive("HB-H1-C")) useGameGlobalsStore.getState().switchToScene("H1-C");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 7,
                    end: 9999999
                }]
            }
        ]
    },
    {
        id: "H1-A",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/36597fa6c0bf1a5820b712e1e832cf8f/manifest/video.m3u8',
            mux: 'https://stream.mux.com/cLZvm9Cue6iqHFP3tkImW01jNIyTH02XPMrsRarh1zwII.m3u8'
        },
        name: 'Skura golvet',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [{
            name: "HB-H0",
            color: 0xff00ff,
            x: 0.5,
            y: 0.5,
            width: 0.2,
            height: 0.2,
            onHit: () => {
                if (hitboxIsActive("HB-H1-A")) useGameGlobalsStore.getState().switchToScene("H0");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 4,
                end: 99999
            }]
        }]
    },
    {
        id: "H1-B",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/30cbfd2e855a15fc730e5b47553dc726/manifest/video.m3u8',
            mux: 'https://stream.mux.com/65wvSj2URoDc28hJTMGgxHkyahCFjL018EOk3y4qmZ4I.m3u8'
        },
        name: 'Shotta',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [{
            name: "HB-H0",
            color: 0x00ffff,
            x: 0.5,
            y: 0.5,
            width: 0.2,
            height: 0.2,
            onHit: () => {
                if (hitboxIsActive("HB-H1-B")) useGameGlobalsStore.getState().switchToScene("H0");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 2,
                end: 99999
            }]
        }]
    },
    {
        id: "H1-C",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/862fd9f600910ac44835de3033d851b4/manifest/video.m3u8',
            mux: 'https://stream.mux.com/avMTA9Mi8qyIWpniz00hu3U4TZNi8td02V02nXAxnZiAeI.m3u8'
        },
        name: 'Tvätta bandet',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [{
            name: "HB-H0",
            color: 0x00ffff,
            x: 0.5,
            y: 0.5,
            width: 0.2,
            height: 0.2,
            onHit: () => {
                if (hitboxIsActive("HB-H1-C")) useGameGlobalsStore.getState().switchToScene("H0");
            },
            isLoaded: false,
            isActive: false,
            activationIntervals: [{
                start: 2,
                end: 99999
            }]
        }]
    },
    {
        id: "H2",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/1e1c05dbe7ceedbf4f7d4f5931f76145/manifest/video.m3u8',
            mux: 'https://stream.mux.com/Xvkq6d7Rm3gsyYwq3X2o38V027VDwbHxydleUXgcZi2k.m3u8'
        },
        name: 'Spela tärning',
        nextScenes: ["H2-A", "H2-B"].concat(getRandomDiceScenes()),
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H2-A",
                color: 0xeb4034,
                x: 0.2,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    const nextScene = useGameGlobalsStore.getState().currentScene?.nextScenes?.[2];
                    if (hitboxIsActive("HB-H2-A") && nextScene) useGameGlobalsStore.getState().switchToScene(nextScene);
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            },
            {
                name: "HB-H2-B",
                color: 0x4287f5,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-B")) useGameGlobalsStore.getState().switchToScene("H2-B");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H2-A-O1",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/W9T8siBEaYxiQciD49S5vGytTrSIwSmThkCzdqmjD00o.m3u8'
        },
        name: 'Motståndare rullar tärning - 3',
        nextScenes: [],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H2-A-O1",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    const nextScene = useGameGlobalsStore.getState().currentScene?.nextScenes?.[1];
                    console.log("HB-H2-A-O1 hit. Next scene: ", nextScene);
                    if (hitboxIsActive("HB-H2-A-O1") && nextScene) useGameGlobalsStore.getState().switchToScene(nextScene);
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-O2",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/p7rHmNQIOL5VqFIMCivEBpxPoUHRJURDpd02286MjW1s.m3u8'
        },
        name: 'Motståndare rullar tärning - 5',
        nextScenes: [],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H2-A-O2",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    const nextScene = useGameGlobalsStore.getState().currentScene?.nextScenes?.[1];
                    console.log("HB-H2-A-O2 hit. Next scene: ", nextScene);
                    if (hitboxIsActive("HB-H2-A-O2") && nextScene) useGameGlobalsStore.getState().switchToScene(nextScene);
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-O3",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/aEUXGvDmOJCQfjbDar502Ken013LhTSISuWH3ZMy01ngxo.m3u8'
        },
        name: 'Motståndare rullar tärning - 6',
        nextScenes: [],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H2-A-O3",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    const nextScene = useGameGlobalsStore.getState().currentScene?.nextScenes?.[1];
                    console.log("HB-H2-A-O3 hit. Next scene: ", nextScene);
                    if (hitboxIsActive("HB-H2-A-O3") && nextScene) useGameGlobalsStore.getState().switchToScene(nextScene);
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-O4",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/92uVPa9H9m7o11cMso7029dj3gjkto6BY00myx9lXVKcY.m3u8'
        },
        name: 'Motståndare rullar tärning - 8',
        nextScenes: [],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H2-A-O4",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    const nextScene = useGameGlobalsStore.getState().currentScene?.nextScenes?.[1];
                    console.log("HB-H2-A-O4 hit. Next scene: ", nextScene);
                    if (hitboxIsActive("HB-H2-A-O4") && nextScene) useGameGlobalsStore.getState().switchToScene(nextScene);
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-O5",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/FxtDCH1cGBazV00XJbbKn3K3oXWgpEKuiyZmdPLwAJqk.m3u8'
        },
        name: 'Motståndare rullar tärning - 10',
        nextScenes: [],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H2-A-O5",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    const nextScene = useGameGlobalsStore.getState().currentScene?.nextScenes?.[1];
                    console.log("HB-H2-A-O5 hit. Next scene: ", nextScene);
                    if (hitboxIsActive("HB-H2-A-O5") && nextScene) useGameGlobalsStore.getState().switchToScene(nextScene);
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-O6",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/vtk700nmmVdB8ABCqiRN00ywwgERkOYNPTTJDDhLbZXP8.m3u8'
        },
        name: 'Motståndare rullar tärning - 11',
        nextScenes: [],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H2-A-O6",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    const nextScene = useGameGlobalsStore.getState().currentScene?.nextScenes?.[1];
                    console.log("HB-H2-A-O6 hit. Next scene: ", nextScene);
                    if (hitboxIsActive("HB-H2-A-O6") && nextScene) useGameGlobalsStore.getState().switchToScene(nextScene);
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-P1-LOSS",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/J7v02Z3X4iy44RhJU0101AP41qLqF0161zPy6Q3xSigDCBs.m3u8'
        },
        name: 'Spelare rullar tärning - 2',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-A")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-P2-LOSS",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/DcEsGlvsOP5skN7DwCfd9E2n8WtAe48rOXzGCpEGuto.m3u8'
        },
        name: 'Spelare rullar tärning - 5',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-A")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-P2-WIN",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/bo1zgeZWEGe69opOV8Z01CEbco3aKdInW9Uvd8Xh4gD4.m3u8'
        },
        name: 'Spelare rullar tärning - 5',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-A")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-P3-LOSS",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/ZpyxMJBpYPhP4vngTecv00lpqJ6vMrAfbUanGhFOVvDM.m3u8'
        },
        name: 'Spelare rullar tärning - 6',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-A")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-P3-WIN",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/LSwHUufCA7rkrnTzwwElP0200fjyJ5vorZzo01TkWJ41eQ.m3u8'
        },
        name: 'Spelare rullar tärning - 6',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-A")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-P4-LOSS",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/i983yJasoq5B600Ub1nMwA5pLVmF02HvRRLo4OMmPfAJo.m3u8'
        },
        name: 'Spelare rullar tärning - 8',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-A")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-P4-WIN",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/zBsVwp9In6cGI01OJB9i01qNANJUHwzF7CInZVUfrb4ws.m3u8'
        },
        name: 'Spelare rullar tärning - 8',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-A")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-P5-LOSS",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/fNXVEOHi58FHopHFtSdL9oJXj02fPzSZkDEpuqjcciVE.m3u8'
        },
        name: 'Spelare rullar tärning - 11',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-A")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-P5-WIN",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/RF1rx5wfLATLA1ne7pyA1PcZanLDlncttXu4XQZGhmw.m3u8'
        },
        name: 'Spelare rullar tärning - 11',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-A")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-A-P6-WIN",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
            mux: 'https://stream.mux.com/Akwc7siInHF1LnFqdwzWVj6QZ5DhmZCNr011RkvNc6ck.m3u8'
        },
        name: 'Spelare rullar tärning - 12',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-A")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 100
                }]
            }
        ]
    },
    {
        id: "H2-B",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/71d83ef9c9cee94946ff3ca862559e8e/manifest/video.m3u8',
            mux: 'https://stream.mux.com/1o8rB9j4WtHuzLM01luUnb00vyCbwiBZ7jtP0037FKvPA8.m3u8'
        },
        name: 'Välter ljus',
        nextScenes: ["H2-B-1", "H2-B-2", "H2-B-3"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H2-B-1",
                color: 0x466918,
                x: 0.2,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-B-1")) useGameGlobalsStore.getState().switchToScene("H2-B-1");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            },
            {
                name: "HB-H2-B-2",
                color: 0x69181b,
                x: 0.6,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-B-2")) useGameGlobalsStore.getState().switchToScene("H2-B-2");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            },
            {
                name: "HB-H2-B-3",
                color: 0x69181b,
                x: 0.8,
                y: 0.8,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-B-3")) useGameGlobalsStore.getState().switchToScene("H2-B-3");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H2-B-1",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/23a7a44d0b80ba678a6ac03759a43a8c/manifest/video.m3u8',
            mux: 'https://stream.mux.com/Hf7nWh9ZoJgogfprtDK5hlQ02eXZbJ2qJCsWd4RZ00Jck.m3u8'
        },
        name: 'Ta ett mynt - Lyckas',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-B-1")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H2-B-2",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4d3e1cd5a89d1cc67b3acc96bb69a9c1/manifest/video.m3u8',
            mux: 'https://stream.mux.com/HKZRAA3vCrxFAnrtXT9oGoK6V57YmK6xjXUnB01maIkU.m3u8'
        },
        name: 'Spring mot dörren',
        nextScenes: ["H2-B-2-A", "H2-B-2-B"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: []
    },
    {
        id: "H2-B-3",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4d3e1cd5a89d1cc67b3acc96bb69a9c1/manifest/video.m3u8',
            mux: 'https://stream.mux.com/ULOR72CqZPtPWx3wzpKw17IMseX9OMr8Mn7xXe02zyCs.m3u8'
        },
        name: 'Ta mynt - Misslyckas',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x00ffff,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H2-B-3")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H3",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/626070ae0b2893d10b59d4f0741c07eb/manifest/video.m3u8',
            mux: 'https://stream.mux.com/uGRxDsvdKgd5D5voRRoAq2uudvdcvuG6s02NmjkOGxgM.m3u8'
        },
        name: 'Armbrytning',
        nextScenes: ["H3-A", "H3-B"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H3-A",
                color: 0x70215e,
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.3,
                onHit: () => {
                    if (hitboxIsActive("HB-H3-A")) useGameGlobalsStore.getState().switchToScene("H3-A");
                },
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }],
            },
            {
                name: "HB-H3-B",
                color: 0x70215e,
                x: 0.4,
                y: 0.2,
                width: 0.1,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H3-B")) useGameGlobalsStore.getState().switchToScene("H3-B");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H3-A",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/dbd58ed46e4d5dd9f22ce09b5dde0dd3/manifest/video.m3u8',
            mux: 'https://stream.mux.com/HDEOwZ86RLeWH1F6Z9rdkpBeyWfM9Jlz3A3frnm6tPc.m3u8'
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
                    start: 2,
                    end: 99999
                }]
            },
        ], customProperties: {
            hits: 0
        }
    },
    {
        id: "H3-A-WIN",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/c3f5830f8398a2c2218278b0a47b0ab8/manifest/video.m3u8',
            mux: 'https://stream.mux.com/01uz00vOk3dL47MSelg2yz00umS8JbBAZgd2Ywm4T75EnE.m3u8'
        },
        name: 'Armbrytning - Vinner',
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
                x: 0.1,
                y: 0.1,
                width: 0.1,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H3-A-WIN")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H3-A-LOSS",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4ef50684bc0cc5e12498ebd29f593caf/manifest/video.m3u8',
            mux: 'https://stream.mux.com/1IBFpzwC2vJd98RVOgsn2feI3pagFr67Aycvmz71NpI.m3u8'
        },
        name: 'Armbrytning - Förlorar',
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
                    if (hitboxIsActive("HB-H3-A-LOSS")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H3-A-1",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4ef50684bc0cc5e12498ebd29f593caf/manifest/video.m3u8',
            mux: 'https://stream.mux.com/JHx9aJHA02fxx9dxyF3636BCL599Pezt8yZXFQiXgnDo.m3u8'
        },
        name: 'Armbrytning - Vinner',
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
                    if (hitboxIsActive("HB-H3-A-1")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H3-A-2",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4ef50684bc0cc5e12498ebd29f593caf/manifest/video.m3u8',
            mux: 'https://stream.mux.com/LkWYeNbNtHtBhSZKZYBa2TvrL7SRsw01k9c6UJsFsk78.m3u8'
        },
        name: 'Armbrytning - Jämnt',
        nextScenes: ["H3-A-1", "H3-A-3"],
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
                    if (hitboxIsActive("HB-H3-A-2")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H3-A-3",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4ef50684bc0cc5e12498ebd29f593caf/manifest/video.m3u8',
            mux: 'https://stream.mux.com/uLj1rJYvZrLsJ01AHhdhQ2ijPAQu8OWQ1AHpDO8pwbao.m3u8'
        },
        name: 'Armbrytning - Förlorar',
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
                    if (hitboxIsActive("HB-H3-A-3")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H3-B",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/db8497398d929262ea657cc711030905/manifest/video.m3u8',
            mux: 'https://stream.mux.com/k6DFX022X00f7NebiYX6x3i1x4ZoGtpga4Euz01Cv6b93k.m3u8'
        },
        name: 'Spelaren förlorar',
        nextScenes: ["G0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-F1",
                color: 0x70215e,
                x: 0.2,
                y: 0.2,
                width: 0.1,
                height: 0.2,
                onHit: () => {
                    // TODO: RESET GAME - START WHEN FINN WAKES UP
                    if (hitboxIsActive("HB-F1")) useGameGlobalsStore.getState().switchToScene("G0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H4",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/307bbb62ad743bdd735e8c8c3c585db9/manifest/video.m3u8',
            mux: 'https://stream.mux.com/U3LFixVH9VTTCbC9fscswacz970032bYisYAhVCyl01C8.m3u8'
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
        ]
    },
    {
        id: "H4-A",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/e6013c545482ee6322457767a0ee39ae/manifest/video.m3u8',
            mux: 'https://stream.mux.com/OgjZWdscuZk7SihdY02HvssVLBjvJlaa3BegMkgvzBmQ.m3u8'
        },
        name: 'Vält pirat - Ta pengar',
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
                    if (hitboxIsActive("HB-H4-A")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H4-B",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/2da5985a1e344594507370843dce6977/manifest/video.m3u8',
            mux: 'https://stream.mux.com/ZjJV01cmAgT2bvju7CI6KbJwM4C01QDuobygkP1SGo8BE.m3u8'
        },
        name: 'Ta pengar - Misslyckas',
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
                x: 0.5,
                y: 0.5,
                width: 0.2,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H4-B")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H4-C",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/2da5985a1e344594507370843dce6977/manifest/video.m3u8',
            mux: 'https://stream.mux.com/U9pL6IQ6FanG003eOmDZpGm02DK1g02aDDGKBaJDz5T6QE.m3u8'
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
                    if (hitboxIsActive("HB-H4-C")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H5",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/b825b39829e2e5bdd4d9f4394f09f87b/manifest/video.m3u8',
            mux: 'https://stream.mux.com/ASntOql3ZK01GlHAtOercyEpRPZ6BmctmYBWdVqiSxBQ.m3u8'
        },
        name: 'Buskspel',
        nextScenes: ["H5-A", "H5-B", "H5-C"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H5-A",
                color: 0x4c1b7d,
                x: 0.6,
                y: 0.5,
                width: 0.3,
                height: 0.6,
                onHit: () => {
                    if (hitboxIsActive("HB-H5-A")) useGameGlobalsStore.getState().switchToScene("H5-A");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            },
            {
                name: "HB-H5-B",
                color: 0x5c7d1b,
                x: 0.9,
                y: 0.5,
                width: 0.25,
                height: 0.6,
                onHit: () => {
                    if (hitboxIsActive("HB-H5-B")) useGameGlobalsStore.getState().switchToScene("H5-B");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            },
            {
                name: "HB-H5-C",
                color: 0x5c7d1b,
                x: 0.3,
                y: 0.5,
                width: 0.2,
                height: 0.4,
                onHit: () => {
                    if (hitboxIsActive("HB-H5-C")) useGameGlobalsStore.getState().switchToScene("H5-C");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H5-A",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/adde7459836d6af2a084852391c8be13/manifest/video.m3u8',
            mux: 'https://stream.mux.com/HCpSHliCBiRlWNqdHaXByNaGi34zvWewAEmZs1Uhm4c.m3u8'
        },
        name: 'Ta lutan',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x4c1b7d,
                x: 0.2,
                y: 0.2,
                width: 0.1,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H5-A")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H5-B",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/699da2dd3426b36a3a92bca1d7385e6c/manifest/video.m3u8',
            mux: 'https://stream.mux.com/ZrK2Xh1G8ru8vGhpOgFISjcdAlHxKA7PPD00IfaA4Gzc.m3u8'
        },
        name: 'Ta fiolen',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x4c1b7d,
                x: 0.2,
                y: 0.2,
                width: 0.1,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H5-B")) useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H5-C",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/001fe21e6520b4e5115b75481e8455e4/manifest/video.m3u8',
            mux: 'https://stream.mux.com/R7J6U02xLicvHhHylxPTGjLJduJO6eQG8tEKBunEt8ow.m3u8'
        },
        name: 'Ta bandkassan',
        nextScenes: ["G0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-G0",
                color: 0x4c1b7d,
                x: 0.2,
                y: 0.2,
                width: 0.1,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H5-C")) useGameGlobalsStore.getState().switchToScene("G0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H6",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/f86ab9a57fcb6735683a3b12a03cd485/manifest/video.m3u8',
            mux: 'https://stream.mux.com/0101K1jiXHKf3vJwLjxbGPgrQJ4y4JIl3LX6jt731xB02M.m3u8'
        },
        name: 'Gå mot dörren',
        nextScenes: ["H6-A", "H6-B"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H6-A",
                color: 0x4c1b7d,
                x: 0.2,
                y: 0.2,
                width: 0.1,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H6-A")) useGameGlobalsStore.getState().switchToScene("H6-A");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            },
            {
                name: "HB-H6-B",
                color: 0x7d1b53,
                x: 0.4,
                y: 0.2,
                width: 0.1,
                height: 0.2,
                onHit: () => {
                    if (hitboxIsActive("HB-H6-B")) useGameGlobalsStore.getState().switchToScene("H6-B");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H6-A",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/2747c5fe01e96e9b16c7379fc0368924/manifest/video.m3u8',
            mux: 'https://stream.mux.com/UBLIXrNIhgvyLaxKa7DTnwSig5kAHTMKVYMtyP3MT0000.m3u8'
        },
        name: 'Stoppas i dörren. "Betala tre mynt!"',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-H0",
                color: 0x4c1b7d,
                x: 0.2,
                y: 0.2,
                width: 0.1,
                height: 0.2,
                onHit: () => {
                    useGameGlobalsStore.getState().switchToScene("H0");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    },
    {
        id: "H6-B",
        source: {
            cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/bf23e9172a67df47903cf1677737a496/manifest/video.m3u8',
            mux: 'https://stream.mux.com/xaQS6GS1EOw0201ppZsSSjzK4H73l7jWiEgl6Arm700QUQ.m3u8'
        },
        name: 'Får passera',
        nextScenes: ["V1"],
        video: {
            player: null,
            hls: null,
            sprite: null
        },
        hitboxes: [
            {
                name: "HB-V1",
                color: 0x4c1b7d,
                x: 0.2,
                y: 0.2,
                width: 0.1,
                height: 0.2,
                onHit: () => {
                    console.log("Switching to V1");
                    // useGameGlobalsStore.getState().switchToScene("V1");
                },
                isLoaded: false,
                isActive: false,
                activationIntervals: [{
                    start: 2,
                    end: 99999
                }]
            }
        ]
    }
];