import { GameGlobalsStore } from './gameGlobals';

function setCurrentScene(sceneId: string | null, get: () => GameGlobalsStore, set: (state: GameGlobalsStore) => void) {
    if (!sceneId) {
        set({ ...get(), currentScene: null });
        return;
    }

    const currentScene = get().stagedScenes.find(scene => scene.id === sceneId);
    if (!currentScene) return console.warn(`Can't set current scene! Scene ${sceneId} not found.`);
    set({ ...get(), currentScene });
}

export default setCurrentScene;