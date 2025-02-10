import { SceneObject } from "@/types";

const H2B2: SceneObject = {
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
}

export default H2B2;
