import { SceneObject } from "@/types";

export const sceneObjects: SceneObject[] = [
    {
        id: "G0",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/f63d15e200eb568dfef34b3b6696a761/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/iqcu02NmYd02TN1QefAGBG1nyhjwpHyXiOvxDvS02iQU1w.m3u8', // Mux - TEST VIDEO
        name: 'Intro sovrum',
        nextScenes: ['H0'],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H0",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/e0853c614b8e69d59b81f4e4a586c200/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/YbnMCyTnPRlnzBlAlvxODSOSJ02pGu00lDqUX8yOWt4M4.m3u8', // Mux - TEST VIDEO
        name: 'Hub',
        nextScenes: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H1",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/51cb3c8b7aec89d2df5aa95981c2a7c0/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/UiJBAwFEiQrQn8Krpjx02GQ00vVfi2imvpuywD3MHzNLQ.m3u8', // Mux - TEST VIDEO
        name: 'Hederligt arbete',
        nextScenes: ["H1-A", "H1-B", "H1-C"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H1-A",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/36597fa6c0bf1a5820b712e1e832cf8f/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/H01rY02DeqoV7KAbWQSmhp43cI38HIXawP7loqNf4S7d4.m3u8', // Mux - TEST VIDEO
        name: 'Skura golvet',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H1-B",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/30cbfd2e855a15fc730e5b47553dc726/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/3ghm4k1029CKKGScoHtwXV005JaG3BCYfXgTMkIBf65Wg.m3u8', // Mux - TEST VIDEO
        name: 'Shotta',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H1-C",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/862fd9f600910ac44835de3033d851b4/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/CLguHyCwSEzj1JAwzM9lVftkoWmcueaLZgKwYAY6dI8.m3u8', // Mux - TEST VIDEO
        name: 'Tvätta bandet',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H2",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/1e1c05dbe7ceedbf4f7d4f5931f76145/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/ff2xGQ26CxUrtdoXw3YpCwQuJi029pJ5TjTLZgugwbFI.m3u8', // Mux - TEST VIDEO
        name: 'Spela tärning',
        nextScenes: ["H2-A", "H2-B"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H2-A",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/7665a8b3eaa5d596946bcd6927b0241d/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/Vw02x6dZe5pBtMtXHiuI18pruEgEW9yki0201ancYEeMTo.m3u8', // Mux - TEST VIDEO
        name: 'Spela tärning',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H2-B",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/71d83ef9c9cee94946ff3ca862559e8e/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/DTNlh85rRHQCobiLAE2UXRfIV00WPnOuDM02H81aOvBxY.m3u8', // Mux - TEST VIDEO
        name: 'Välter ljus',
        nextScenes: ["H2-B-1", "H2-B-2"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H2-B-1",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/23a7a44d0b80ba678a6ac03759a43a8c/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/L027WIpIcgirk01kJKb63700mCQIa2OH00KU1uL7lMJXz2c.m3u8', // Mux - TEST VIDEO
        name: 'Ta ett mynt',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H2-B-2",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4d3e1cd5a89d1cc67b3acc96bb69a9c1/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/m5d331kNJVqHsnYKX9i9UIq02XDKjkZ2OUcTSgh6lx2g.m3u8', // Mux - TEST VIDEO
        name: 'Spring mot dörren',
        nextScenes: ["H2-B-2-A", "H2-B-2-B"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H2-B-2-A",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/254f451ec392f08be277a883347d61c5/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/KmX9z68lM5rtWk00nAxqGLTzdRNEuq01gglmx2YtLRNgU.m3u8', // Mux - TEST VIDEO
        name: 'Värdshusvärden säger STOPP!',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H2-B-2-B",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/a9dfcc1329fa0a8ffb98f3c0dbf5fae8/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/jr5NhpbzaGUR5jsGEi1GS4S9zVf4Nak1tA8sJYc86FA.m3u8', // Mux - TEST VIDEO
        name: 'Hinner ut ur dörren',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H3",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/626070ae0b2893d10b59d4f0741c07eb/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/FlFhytpnGB89O01pzvQxOSvW8kmCcZf26JylLY9OC4Jw.m3u8', // Mux - TEST VIDEO
        name: 'Armbrytning',
        nextScenes: ["H3-A", "H3-B"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H3-A",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/dbd58ed46e4d5dd9f22ce09b5dde0dd3/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/IKYHEhkqVQ6WUoxF7ZRFVzPGea3mGAJDA02JeFkF7m84.m3u8', // Mux - TEST VIDEO
        name: 'Klicka snabbt för att bryta arm',
        nextScenes: ["H3-A-WIN", "H3-A-LOSS"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H3-A-WIN",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/c3f5830f8398a2c2218278b0a47b0ab8/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/Kpnng01300FM6ElvtlsQRsyRtUPWH6ZyZjJqETtJmWYqg.m3u8', // Mux - TEST VIDEO
        name: 'Vinna ger ingen effekt',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H3-A-LOSS",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4ef50684bc0cc5e12498ebd29f593caf/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/UUDEvpvLI02YfMoxezmALmuRntM4yo00X1N51loZRFUVE.m3u8', // Mux - TEST VIDEO
        name: 'Ramlar och hittar ett mynt',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H3-B",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/db8497398d929262ea657cc711030905/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/7tzjrTc1ssK9XyeJZuvm3ZsGABkxd9uCCGmqxJc6xco.m3u8', // Mux - TEST VIDEO
        name: 'Spelaren förlorar',
        nextScenes: ["F1"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H4",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/307bbb62ad743bdd735e8c8c3c585db9/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/Y16EUvXMk7wzN17Z3BxLWpcKLuC36r4cmK3pkM74Hzo.m3u8', // Mux - TEST VIDEO
        name: 'Stjäla',
        nextScenes: ["H4-A", "H4-B"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H4-A",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/e6013c545482ee6322457767a0ee39ae/manifest/video.m3u8', // Cloudflare
        url: 'https://www.dropbox.com/scl/fi/w6ghf4vtcrg2rgfc4pgu4/H4-A.mp4?rlkey=418zxjgdl88xwipltbnzojsh7&dl=0', // Mux - TEST VIDEO
        name: 'Ta mynt',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H4-B",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/2da5985a1e344594507370843dce6977/manifest/video.m3u8', // Cloudflare
        url: 'https://www.dropbox.com/scl/fi/0ifwuk117ium5jkpl4e1o/H4-B.mp4?rlkey=l75lkdep4lmvg417v9lmqwfsk&dl=0', // Mux - TEST VIDEO
        name: 'Dricka öl',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H5",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/b825b39829e2e5bdd4d9f4394f09f87b/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/L4sN73aaQ001y6RBWURcT9Pe5BGNjeajWX8PhbCXQRF4.m3u8', // Mux - TEST VIDEO
        name: 'Buskspel',
        nextScenes: ["H5-A", "H5-B", "H5-C"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H5-A",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/adde7459836d6af2a084852391c8be13/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/QXY1iFHhLHuS4f6JGZeA8rLiT4AXW3n02IHWNMGpXyoo.m3u8', // Mux - TEST VIDEO
        name: 'Ta lutan',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H5-B",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/699da2dd3426b36a3a92bca1d7385e6c/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/V3WRXx01qKg3X1XI3RtLAwarD5qXbPkRgECAHX54hP02I.m3u8', // Mux - TEST VIDEO
        name: 'Ta fiolen',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H5-C",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/001fe21e6520b4e5115b75481e8455e4/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/AGATYboOOj5pO01tbywahvX5tIpahtcLRuU02gFxq4g6E.m3u8', // Mux - TEST VIDEO
        name: 'Ta bandkassan',
        nextScenes: ["G0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H6",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/f86ab9a57fcb6735683a3b12a03cd485/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/0101K1jiXHKf3vJwLjxbGPgrQJ4y4JIl3LX6jt731xB02M.m3u8', // Mux - TEST VIDEO
        name: 'Gå mot dörren',
        nextScenes: ["H6-A", "H6-B"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H6-A",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/2747c5fe01e96e9b16c7379fc0368924/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/3i84EO029XO01C3W2v46oYTuSqPQ8HfxeejD8WerSo8Hg.m3u8', // Mux - TEST VIDEO
        name: 'Stoppas i dörren. "Betala tre mynt!"',
        nextScenes: ["H0"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    },
    {
        id: "H6-B",
        // url: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/bf23e9172a67df47903cf1677737a496/manifest/video.m3u8', // Cloudflare
        url: 'https://stream.mux.com/xysnsFbGIKN81nulgtQp1iJNLxgn9p5jGIJ63DS01roQ.m3u8', // Mux - TEST VIDEO
        name: 'Får passera',
        nextScenes: ["V1"],
        video: {
            player: null,
            hls: null,
            sprite: null
        }
    }
];
