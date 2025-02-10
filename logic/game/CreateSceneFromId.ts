import { sceneObjects } from "@/config/sceneConfig";
import { StagedSceneObject } from "@/types";
import { cleanupSprite } from "@/utils/cleanupSprite";
import { cleanupVideo } from "@/utils/cleanupVideo";
import { calculateDiceWinner, getRandomPlayerDiceScene } from "@/utils/randomDiceScenes";

const createSceneFromId = (id: string, autoplay: boolean = false) => {
    try {
        const newScene = sceneObjects.find((scene) => scene.id === id);
        if (!newScene) return;

        // TODO: FIX THIS HACK
        if (newScene.id?.includes("H2-A-O")) {
            const newPlayerScene = getRandomPlayerDiceScene();
            if (!newPlayerScene) {
                console.warn("Couldn't get random player dice scene");
            }
            else {
                const playerSceneResult = calculateDiceWinner({ opponent: newScene.id, player: newPlayerScene });
                if (!playerSceneResult) {
                    console.warn("Couldn't calculate dice winner");
                }
                else {
                    newScene.nextScenes = playerSceneResult;
                }
            }
        }

        const stagedScene: StagedSceneObject = {
            ...newScene,
            loading: false,
            isActive: false,
            isReady: false,
            autoplay,
            clear: () => {
                cleanupVideo(stagedScene);
                cleanupSprite(stagedScene);
                // console.log(
                //     "%cClearing scene %c" + newScene.id,
                //     "color: orange",
                //     "color: cyan"
                // );
            },
            customProperties: newScene.customProperties
        };

        return stagedScene;
    } catch (error) {
        console.error("Error creating scene from id", error);
    }
}

export default createSceneFromId;