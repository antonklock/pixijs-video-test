import addHitbox from '@/PixiJs/addHitbox';
import { GameGlobalsStore } from './gameGlobals';
import useGameGlobalsStore from '@/stores/gameGlobals/gameGlobals';
import { StagedSceneObject } from '@/types';
import { sceneObjects } from '@/config/sceneConfig';
import removeAllHitboxes from '@/PixiJs/removeAllHitboxes';

interface SwitchToSceneConfig {
    sceneId: string;
    loadNextScenes: boolean;
    get: () => GameGlobalsStore;
    set: (state: GameGlobalsStore) => void;
}

async function handleSwitchToScene({ sceneId, loadNextScenes = true, get, set }: SwitchToSceneConfig) {
    if (!sceneObjects.some(sceneObject => sceneObject.id === sceneId)) {
        console.warn(`Scene ${sceneId} config not found in sceneObjects`);
        return;
    }

    let scene: StagedSceneObject | null = get().stagedScenes.find(scene => scene.id === sceneId) ?? null;

    // If scene not found, try to add it and retry
    if (!scene) {
        console.warn(`Can't play scene! Scene ${sceneId} not found. Trying to add it...`);

        // TODO: Lets add a limit on how many times we can retry adding the scene
        if (!scene) {
            setTimeout(async () => {
                scene = await useGameGlobalsStore.getState().addNewScene(sceneId);
                handleSwitchToScene({ sceneId, loadNextScenes: true, get, set });
                return;
            }, 200);
            return console.warn(`Can't play scene! Scene ${sceneId} not found.`);
        }
    }

    // Activating scene
    scene.video.sprite.visible = true;
    scene.video.player?.play();
    scene.isActive = true;
    set({ ...get(), currentScene: scene });

    if (!loadNextScenes) {
        const { stagedScenes } = get();
        stagedScenes.forEach(scene => {
            if (scene.id === sceneId) return;
            if (scene.nextScenes.includes(scene.id)) return;

            scene.isActive = false;
            scene.video.sprite.visible = false;

            // TODO: Can we make this more elegant?
            setTimeout(() => {
                scene.video.player?.pause();
                // get().unstageScene(scene.id);
            }, 1000);
        });
        return console.log("Skipping loading next scenes");
    }

    // Remove old hitboxes
    get().hitboxes.forEach(removeAllHitboxes);

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
