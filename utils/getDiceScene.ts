import { sceneObjects } from "@/config/sceneConfig";

const getOpponentDiceScene = () => {
    const h2 = sceneObjects.find((scene) => scene.id === "H2");
    if (!h2) return console.error("Couldn't find H2 scene");

    const opponentScene = h2.nextScenes[2];
    if (!opponentScene) return console.error("Couldn't find opponent scene");

    return opponentScene;
}

const getPlayerDiceScene = () => {
    const h2 = sceneObjects.find((scene) => scene.id === "H2");
    if (!h2) return console.error("Couldn't find H2 scene");

    const playerScene = h2.nextScenes[3];
    if (!playerScene) return console.error("Couldn't find player scene");

    return playerScene;
}


export { getOpponentDiceScene, getPlayerDiceScene };

