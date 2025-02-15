import { SceneObject } from "@/types";

const H3A2: SceneObject = {
    id: "H3-A-2",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4ef50684bc0cc5e12498ebd29f593caf/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/LkWYeNbNtHtBhSZKZYBa2TvrL7SRsw01k9c6UJsFsk78.m3u8' // Mux
        mux: 'https://klockworks.xyz/H3-A-2/playlist.m3u8' // R2
    },
    name: 'Armbrytning - Jämnt',
    nextScenes: ["H3-A-1", "H3-A-3"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: []
}

export default H3A2;