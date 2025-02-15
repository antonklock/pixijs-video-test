import { SceneObject } from "@/types";

const H3A3: SceneObject = {
    id: "H3-A-3",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4ef50684bc0cc5e12498ebd29f593caf/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/uLj1rJYvZrLsJ01AHhdhQ2ijPAQu8OWQ1AHpDO8pwbao.m3u8' // Mux
        mux: 'https://klockworks.xyz/H3-A-3/playlist.m3u8' // R2
    },
    name: 'Armbrytning - Förlorar',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: []
}

export default H3A3;