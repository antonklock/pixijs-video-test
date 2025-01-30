import addHitbox from '@/PixiJs/addHitbox';
import { GameGlobalsStore } from './gameGlobals';

function handleSwitchToScene(sceneId: string, get: () => GameGlobalsStore, set: (state: GameGlobalsStore) => void) {
    const scene = get().stagedScenes.find(scene => scene.id === sceneId);
    if (!scene) return console.warn(`Can't play scene! Scene ${sceneId} not found.`);

    // Activating scene
    scene.video.sprite.visible = true;
    scene.video.player?.play();
    scene.isActive = true;
    set({ ...get(), currentScene: scene });

    scene.hitboxes.forEach(hitboxConfig => {
        const { onHit, ...config } = hitboxConfig;
        addHitbox({
            ...config, onClick: () => {
                if (onHit) onHit();
            }
        });
        console.log("Created hitbox: ", hitboxConfig);
    });

    // Unstaging scenes
    const { stagedScenes } = get();

    stagedScenes.forEach(scene => {
        if (scene.id === sceneId) return;
        if (scene.nextScenes.includes(scene.id)) return;

        console.log("Unstaging scene: ", scene.id);

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
