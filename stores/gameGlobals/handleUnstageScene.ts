import { GameGlobalsStore } from './gameGlobals';

export default function handleUnstageScene(sceneId: string, get: () => GameGlobalsStore, set: (state: GameGlobalsStore) => void) {
    const scene = get().stagedScenes.find(scene => scene.id === sceneId);
    if (!scene) return console.warn(`Can't unstage scene! Scene ${sceneId} not found.`);

    console.log("%cUnstaging scene", "color: orange; font-weight: bold;", sceneId);

    scene.video.sprite.visible = false;
    // scene.video.player?.pause();
    scene.isActive = false;
    scene.clear();

    set({ ...get(), stagedScenes: get().stagedScenes.filter(scene => scene.id !== sceneId) });
}