import { sceneObjects } from "@/config/sceneConfig";
import { StagedSceneObject } from "@/types";
import { cleanupSprite } from "@/utils/cleanupSprite";
import { cleanupVideo } from "@/utils/cleanupVideo";

const createSceneFromId = (id: string, autoplay: boolean = false) => {
    const newScene = sceneObjects.find((scene) => scene.id === id);
    if (!newScene) return;

    const stagedScene: StagedSceneObject = {
        ...newScene,
        loading: false,
        isActive: false,
        isReady: false,
        autoplay,
        clear: () => {
            cleanupVideo(stagedScene);
            cleanupSprite(stagedScene);
            console.log(
                "%cClearing scene %c" + newScene.id,
                "color: orange",
                "color: cyan"
            );
        },
        customProperties: newScene.customProperties
    };
    return stagedScene;
}

export default createSceneFromId;