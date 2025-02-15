import { SceneObject } from "@/types";

const H3A1: SceneObject = {
    id: "H3-A-1",
    source: {
        cloudflare: 'https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/4ef50684bc0cc5e12498ebd29f593caf/manifest/video.m3u8',
        // mux: 'https://stream.mux.com/JHx9aJHA02fxx9dxyF3636BCL599Pezt8yZXFQiXgnDo.m3u8' // Mux
        mux: 'https://klockworks.xyz/H3-A-1/playlist.m3u8' // R2
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