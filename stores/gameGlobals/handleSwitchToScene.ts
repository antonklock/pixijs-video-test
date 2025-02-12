import addHitbox from '@/PixiJs/addHitbox';
import { GameGlobalsStore } from './gameGlobals';
import useGameGlobalsStore from '@/stores/gameGlobals/gameGlobals';
import { StagedSceneObject } from '@/types';
import { sceneObjects } from '@/config/sceneConfig';
import removeAllHitboxes from '@/PixiJs/removeAllHitboxes';
import * as Tone from "tone";
import useFxStore from '../FX/fxStore';
import useGameSessionStore from '../gameSession/gameSession';

interface SwitchToSceneConfig {
    sceneId: string;
    loadNextScenes: boolean;
    get: () => GameGlobalsStore;
    set: (state: GameGlobalsStore) => void;
}

async function handleSwitchToScene({ sceneId, loadNextScenes = true, get, set }: SwitchToSceneConfig) {
    const currentScene = get().currentScene;
    const currentSceneId = currentScene?.id;

    if (sceneId === currentSceneId) {
        console.log("Scene already loaded. Skipping...");
        return;
    }

    if (!sceneObjects.some(sceneObject => sceneObject.id === sceneId)) {
        console.warn(`Scene ${sceneId} config not found in sceneObjects`);
        return;
    }

    let newScene: StagedSceneObject | null = get().stagedScenes.find(scene => scene.id === sceneId) ?? null;

    // If scene not found, try to add it and retry
    if (!newScene) {
        console.warn(`Can't play scene! Scene ${sceneId} not found in staged scenes. Trying to add it...`);

        // TODO: Lets add a limit on how many times we can retry adding the scene
        if (!newScene) {
            setTimeout(async () => {
                newScene = await useGameGlobalsStore.getState().addNewScene(sceneId);
                handleSwitchToScene({ sceneId, loadNextScenes: true, get, set });
                return;
            }, 200);
            return console.warn(`Can't play scene! Scene ${sceneId} not found.`);
        }
    }

    const seconds = Tone.getTransport().seconds;
    const newCurrentTime = seconds;
    const player = newScene.video.player as HTMLVideoElement;

    // TODO: Can we make this more elegant?
    if (newScene.id === "H0") {
        player.currentTime = newCurrentTime;
        await useFxStore.getState().fadeToBlack(250);
        await player.play();
        useFxStore.getState().unfadeToBlack(250);
    } else if (newScene.id === "L1") {
        await useFxStore.getState().fadeToBlack(250);
        await player.play();
        useFxStore.getState().unfadeToBlack(250);
    }
    else {
        await player.play();
    }

    console.log("Switching to scene:", sceneId);

    // Activating scene
    newScene.video.sprite.visible = true;
    // scene.video.player?.play();
    newScene.isActive = true;
    set({ ...get(), currentScene: newScene });
    get().setSceneEvents(new Set(newScene.sceneEvents?.map(event => event.name) ?? []));
    const sceneEvents = get().sceneEvents;
    console.log("Scene events set:", sceneEvents);

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
    newScene.hitboxes.forEach(hitboxConfig => {
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
    newScene.nextScenes.forEach(nextSceneId => {
        get().addNewScene(nextSceneId);
    });

    // End previous scene
    const newDate = new Date();

    if (currentScene) {
        useGameSessionStore.getState().endScene(currentScene, newDate);
    } else {
        console.warn("Can't end previous scene in session. No previous scene found");
    }

    // Add scene to session
    useGameSessionStore.getState().startScene(newScene, newDate);

    const videoPlayer = newScene.video.player as HTMLVideoElement;
    videoPlayer.muted = false;
}

export default handleSwitchToScene;
