import addHitbox from '@/PixiJs/addHitbox';
import { GameGlobalsStore } from './gameGlobals';
import removeHitbox from '@/PixiJs/removeHitbox';
import useGameGlobalsStore from '@/stores/gameGlobals/gameGlobals';
import { StagedSceneObject } from '@/types';

async function handleSwitchToScene(sceneId: string, get: () => GameGlobalsStore, set: (state: GameGlobalsStore) => void) {
    let scene: StagedSceneObject | null = get().stagedScenes.find(scene => scene.id === sceneId) ?? null;

    // If scene not found, try to add it and retry
    if (!scene) {
        console.warn(`Can't play scene! Scene ${sceneId} not found. Trying to add it...`);

        scene = await useGameGlobalsStore.getState().addNewScene(sceneId);
        if (!scene) return console.warn(`Can't play scene! Scene ${sceneId} not found.`);
        handleSwitchToScene(sceneId, get, set);
        return;
    }

    // Activating scene
    scene.video.sprite.visible = true;
    scene.video.player?.play();
    scene.isActive = true;
    set({ ...get(), currentScene: scene });

    // Remove old hitboxes
    get().hitboxes.forEach(hitbox => {
        removeHitbox(hitbox.label);
    });

    // Adding new hitboxes
    scene.hitboxes.forEach(hitboxConfig => {
        const { onHit, ...config } = hitboxConfig;
        addHitbox({
            ...config, onClick: () => {
                if (onHit) onHit();
            }
        });
    });

    // Unstaging scenes
    const { stagedScenes } = get();
    stagedScenes.forEach(scene => {
        if (scene.id === sceneId) return;
        if (scene.nextScenes.includes(scene.id)) return;

        scene.isActive = false;
        scene.video.sprite.visible = false;

        // TODO: Can we make this more elegant?
        setTimeout(() => {
            scene.video.player?.pause();
            get().unstageScene(scene.id);
        }, 1000);
    });

    // Add next scenes
    scene.nextScenes.forEach(nextSceneId => {
        get().addNewScene(nextSceneId);
    });
}

export default handleSwitchToScene;
