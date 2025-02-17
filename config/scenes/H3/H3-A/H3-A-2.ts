import { SceneObject } from "@/types";

const H3A2: SceneObject = {
    id: "H3-A-2",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H3-A-2/playlist.m3u8' // R2
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