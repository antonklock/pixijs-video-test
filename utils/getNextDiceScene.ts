import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

export default function getNextDiceScene() {
    const nextScene = useGameGlobalsStore.getState().currentScene?.nextScenes?.[0];

    if (nextScene?.includes("WIN")) {
        console.log("WINNER");
        useGameGlobalsStore.getState().setCoins(useGameGlobalsStore.getState().coins + 1);
    } else {
        console.log("LOSER");
    }

    return nextScene;
}