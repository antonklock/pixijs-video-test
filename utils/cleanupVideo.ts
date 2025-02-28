import { StagedSceneObject } from "@/types";

export const cleanupVideo = (stagedSceneObject: StagedSceneObject) => {
    const video = stagedSceneObject.video.player;
    const hls = stagedSceneObject.video.hls;
    if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
        video.remove();
    }
    if (hls) {
        hls.stopLoad();
        hls.detachMedia();
        hls.destroy();
    }
};

