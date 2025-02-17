import { SceneObject } from "@/types";

const H3A1: SceneObject = {
    id: "H3-A-1",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H3-A-1/playlist.m3u8' // R2
    },
    name: 'Armbrytning - Vinner',
    nextScenes: ["H0"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: []
}

export default H3A1;