import { SceneObject } from "@/types";

const H2B2: SceneObject = {
    id: "H2-B-2",
    source: {
        cloudflare: '',
        mux: '', // Mux
        R2: 'https://klockworks.xyz/H2-B-2/playlist.m3u8' // R2
    },
    name: 'Spring mot dörren',
    nextScenes: ["H2-B-2-A", "H2-B-2-B"],
    video: {
        player: null,
        hls: null,
        sprite: null
    },
    hitboxes: []
}

export default H2B2;
