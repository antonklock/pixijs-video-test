// import { SceneObject } from "@/types";

// export const sceneObjects: SceneObject[] = [
//     {
//         id: "G0",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/f63d15e200eb568dfef34b3b6696a761/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/6TLRQJ1e2xp02lshfjpBg42DYMdCoLf3MongqkQRUmLo.m3u8'
//         },
//         name: 'Intro sovrum',
//         nextScenes: ['H0'],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H0",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/abf023c6468cc5cedaaf896dd6cade2f/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/AZZOFn02NIEGLvAygrAlwBelpLk9mQWvzVm02pROtyFr4.m3u8'
//         },
//         name: 'Hub',
//         nextScenes: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H1",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/51cb3c8b7aec89d2df5aa95981c2a7c0/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/9dPejgoesR1zQ1mXs9scd5gHJ34g8Jp00NwnVFFHxmzI.m3u8'
//         },
//         name: 'Hederligt arbete',
//         nextScenes: ["H1-A", "H1-B", "H1-C"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H1-A",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/36597fa6c0bf1a5820b712e1e832cf8f/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/cLZvm9Cue6iqHFP3tkImW01jNIyTH02XPMrsRarh1zwII.m3u8'
//         },
//         name: 'Skura golvet',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H1-B",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/30cbfd2e855a15fc730e5b47553dc726/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/65wvSj2URoDc28hJTMGgxHkyahCFjL018EOk3y4qmZ4I.m3u8'
//         },
//         name: 'Shotta',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H1-C",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/862fd9f600910ac44835de3033d851b4/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/avMTA9Mi8qyIWpniz00hu3U4TZNi8td02V02nXAxnZiAeI.m3u8'
//         },
//         name: 'Tvätta bandet',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H2",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/1e1c05dbe7ceedbf4f7d4f5931f76145/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/ff2xGQ26CxUrtdoXw3YpCwQuJi029pJ5TjTLZgugwbFI.m3u8'
//         },
//         name: 'Spela tärning',
//         nextScenes: ["H2-A", "H2-B"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H2-A",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/Vw02x6dZe5pBtMtXHiuI18pruEgEW9yki0201ancYEeMTo.m3u8'
//         },
//         name: 'Spela tärning',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H2-B",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/71d83ef9c9cee94946ff3ca862559e8e/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/DTNlh85rRHQCobiLAE2UXRfIV00WPnOuDM02H81aOvBxY.m3u8'
//         },
//         name: 'Välter ljus',
//         nextScenes: ["H2-B-1", "H2-B-2"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H2-B-1",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/23a7a44d0b80ba678a6ac03759a43a8c/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/L027WIpIcgirk01kJKb63700mCQIa2OH00KU1uL7lMJXz2c.m3u8'
//         },
//         name: 'Ta ett mynt',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H2-B-2",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4d3e1cd5a89d1cc67b3acc96bb69a9c1/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/m5d331kNJVqHsnYKX9i9UIq02XDKjkZ2OUcTSgh6lx2g.m3u8'
//         },
//         name: 'Spring mot dörren',
//         nextScenes: ["H2-B-2-A", "H2-B-2-B"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H2-B-2-A",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/254f451ec392f08be277a883347d61c5/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/KmX9z68lM5rtWk00nAxqGLTzdRNEuq01gglmx2YtLRNgU.m3u8'
//         },
//         name: 'Värdshusvärden säger STOPP!',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H2-B-2-B",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/a9dfcc1329fa0a8ffb98f3c0dbf5fae8/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/jr5NhpbzaGUR5jsGEi1GS4S9zVf4Nak1tA8sJYc86FA.m3u8'
//         },
//         name: 'Hinner ut ur dörren',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H3",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/626070ae0b2893d10b59d4f0741c07eb/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/FlFhytpnGB89O01pzvQxOSvW8kmCcZf26JylLY9OC4Jw.m3u8'
//         },
//         name: 'Armbrytning',
//         nextScenes: ["H3-A", "H3-B"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H3-A",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/dbd58ed46e4d5dd9f22ce09b5dde0dd3/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/UiJBAwFEiQrQn8Krpjx02GQ00vVfi2imvpuywD3MHzNLQ.m3u8'
//         },
//         name: 'Klicka snabbt för att bryta arm',
//         nextScenes: ["H3-A-WIN", "H3-A-LOSS"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H3-A-WIN",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/c3f5830f8398a2c2218278b0a47b0ab8/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/Kpnng01300FM6ElvtlsQRsyRtUPWH6ZyZjJqETtJmWYqg.m3u8'
//         },
//         name: 'Vinna ger ingen effekt',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H3-A-LOSS",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4ef50684bc0cc5e12498ebd29f593caf/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/UUDEvpvLI02YfMoxezmALmuRntM4yo00X1N51loZRFUVE.m3u8'
//         },
//         name: 'Ramlar och hittar ett mynt',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H3-B",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/db8497398d929262ea657cc711030905/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/7tzjrTc1ssK9XyeJZuvm3ZsGABkxd9uCCGmqxJc6xco.m3u8'
//         },
//         name: 'Spelaren förlorar',
//         nextScenes: ["F1"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H4",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/307bbb62ad743bdd735e8c8c3c585db9/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/U3LFixVH9VTTCbC9fscswacz970032bYisYAhVCyl01C8.m3u8'
//         },
//         name: 'Stjäla',
//         nextScenes: ["H4-A", "H4-B"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H4-A",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/e6013c545482ee6322457767a0ee39ae/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/OgjZWdscuZk7SihdY02HvssVLBjvJlaa3BegMkgvzBmQ.m3u8'
//         },
//         name: 'Vält pirat - Ta pengar',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H4-B",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/2da5985a1e344594507370843dce6977/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/ZjJV01cmAgT2bvju7CI6KbJwM4C01QDuobygkP1SGo8BE.m3u8'
//         },
//         name: 'Ta pengar - Misslyckas',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H4-C",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/2da5985a1e344594507370843dce6977/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/U9pL6IQ6FanG003eOmDZpGm02DK1g02aDDGKBaJDz5T6QE.m3u8'
//         },
//         name: 'Dricka öl',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H5",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/b825b39829e2e5bdd4d9f4394f09f87b/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/ASntOql3ZK01GlHAtOercyEpRPZ6BmctmYBWdVqiSxBQ.m3u8'
//         },
//         name: 'Buskspel',
//         nextScenes: ["H5-A", "H5-B", "H5-C"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H5-A",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/adde7459836d6af2a084852391c8be13/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/HCpSHliCBiRlWNqdHaXByNaGi34zvWewAEmZs1Uhm4c.m3u8'
//         },
//         name: 'Ta lutan',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H5-B",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/699da2dd3426b36a3a92bca1d7385e6c/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/ZrK2Xh1G8ru8vGhpOgFISjcdAlHxKA7PPD00IfaA4Gzc.m3u8'
//         },
//         name: 'Ta fiolen',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H5-C",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/001fe21e6520b4e5115b75481e8455e4/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/R7J6U02xLicvHhHylxPTGjLJduJO6eQG8tEKBunEt8ow.m3u8'
//         },
//         name: 'Ta bandkassan',
//         nextScenes: ["G0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H6",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/f86ab9a57fcb6735683a3b12a03cd485/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/0101K1jiXHKf3vJwLjxbGPgrQJ4y4JIl3LX6jt731xB02M.m3u8'
//         },
//         name: 'Gå mot dörren',
//         nextScenes: ["H6-A", "H6-B"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H6-A",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/2747c5fe01e96e9b16c7379fc0368924/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/3i84EO029XO01C3W2v46oYTuSqPQ8HfxeejD8WerSo8Hg.m3u8'
//         },
//         name: 'Stoppas i dörren. "Betala tre mynt!"',
//         nextScenes: ["H0"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     },
//     {
//         id: "H6-B",
//         source: {
//             cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/bf23e9172a67df47903cf1677737a496/manifest/video.m3u8',
//             mux: 'https://stream.mux.com/xysnsFbGIKN81nulgtQp1iJNLxgn9p5jGIJ63DS01roQ.m3u8'
//         },
//         name: 'Får passera',
//         nextScenes: ["V1"],
//         video: {
//             player: null,
//             hls: null,
//             sprite: null
//         }
//     }
// ];
