import useGameGlobalsStore, { GameGlobalsStore } from './gameGlobals';

function setCurrentScene(sceneId: string | null, get: () => GameGlobalsStore, set: (state: GameGlobalsStore) => void) {
    if (!sceneId) {
        set({ ...get(), currentScene: null });
        return;
    }

    const currentScene = get().stagedScenes.find(scene => scene.id === sceneId);
    if (!currentScene) return console.warn(`Can't set current scene! Scene ${sceneId} not found in staged scenes. Staged scenes: ${useGameGlobalsStore.getState().stagedScenes.map(scene => scene.id)}`);
    set({ ...get(), currentScene });
    const sceneEventNames = currentScene.sceneEvents?.map(sceneEvent => sceneEvent.name) ?? [];
    get().setSceneEvents(new Set(sceneEventNames));
    console.log("Scene events set:", sceneEventNames);
}

export default setCurrentScene;