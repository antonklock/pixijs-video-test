import { SceneObject } from "@/types";

const H6B: SceneObject = {
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
    hitboxes: []
}

export default H6B;