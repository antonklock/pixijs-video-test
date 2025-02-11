import useGameSessionStore from "@/stores/gameSession/gameSession";

export function isSceneStarted(sceneId: string): boolean {
    const { startedScenes } = useGameSessionStore.getState();
    return startedScenes.has(sceneId);
}
