import { StagedSceneObject } from "@/types";

export const cleanupSprite = (stagedScene: StagedSceneObject) => {
    if (stagedScene.video.sprite) {
        stagedScene.video.sprite.destroy();
        stagedScene.video.sprite = null;
    }
};