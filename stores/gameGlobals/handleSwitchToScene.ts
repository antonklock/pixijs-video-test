import useGameGlobalsStore from '@/stores/gameGlobals/gameGlobals';
import removeAllHitboxes from '@/PixiJs/removeAllHitboxes';
import { sceneObjects } from '@/config/sceneConfig';
import { GameGlobalsStore } from './gameGlobals';
import { StagedSceneObject } from '@/types';
import addHitbox from '@/PixiJs/addHitbox';
import * as PIXI from 'pixi.js';
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
    const gameTime = get().gameTime;
    const loseTime = get().loseTime;

    if (sceneId === currentSceneId) {
        console.log("Scene already loaded. Skipping...");
        return;
    }

    if (!sceneObjects.some(sceneObject => sceneObject.id === sceneId)) {
        console.warn(`Scene ${sceneId} config not found in sceneObjects`);
        return;
    }

    let newScene: StagedSceneObject | null = get().stagedScenes.find(scene => scene.id === sceneId) ?? null;

    if (get().gameState === "lost" && newScene?.id !== "L1" && gameTime > loseTime) {
        console.log("Game is lost. Skipping...");
        return;
    }

    if (get().gameState === "won" && newScene?.id !== "H6-B" && gameTime > loseTime) {
        console.log("Game is over. Player won! Skipping scene switch.");
        return;
    }

    const app = get().app;

    if (app) {
        app.stage.children.forEach((child: PIXI.Graphics | PIXI.Container) => {
            if (child.label === "skip-intro") {
                if (newScene?.id !== "G0") {
                    child.destroy();
                }
            }
        });
    }


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

    console.log("New scene: ", newScene);

    let seconds = Tone.getTransport().seconds;
    let newCurrentTime = seconds ?? 0;
    const player = newScene.video.player as HTMLVideoElement;
    const videoPlayers = document.querySelectorAll('video');

    // TODO: Can we make this more elegant?
    if (newScene.id === "H0") {
        await useFxStore.getState().fadeToBlack(250);
        await player.play();
        changeVideoPlayer(0);
        seconds = Tone.getTransport().seconds;
        if (!seconds || seconds === 0) {
            console.log("Seconds is 0");
        }
        newCurrentTime = seconds ?? 0;
        player.currentTime = newCurrentTime - 1.75;
        console.log("New current time: ", newCurrentTime);
        setTimeout(() => {
            useFxStore.getState().unfadeToBlack(250);
        }, 250);
    } else if (newScene.id === "L1") {
        await useFxStore.getState().fadeToBlack(250);
        await player.play();
        changeVideoPlayer(0);
        useFxStore.getState().unfadeToBlack(250);
    } else if (newScene.id === "H6-B") {
        await useFxStore.getState().fadeToBlack(250);
        await player.play();
        changeVideoPlayer(0);
        seconds = 6.4;
        newCurrentTime = seconds ?? 0;
        player.currentTime = newCurrentTime - 1.5;
        console.log("New current time: ", newCurrentTime);
        setTimeout(() => {
            useFxStore.getState().unfadeToBlack(250);
        }, 250);
    } else if (newScene.id === "H6-A") {
        await useFxStore.getState().fadeToBlack(250);
        await player.play();
        changeVideoPlayer(0);
        seconds = 6.4;
        newCurrentTime = seconds ?? 0;
        player.currentTime = newCurrentTime - 1.5;
        await useFxStore.getState().unfadeToBlack(250);
    } else if (newScene.id === "H1") {
        // await useFxStore.getState().fadeToBlack(250);
        await player.play();
        changeVideoPlayer(0);
        seconds = 2.9;
        newCurrentTime = seconds ?? 0;
        player.currentTime = newCurrentTime - 1.5;
    } else if (newScene.id === "L2") {
        await useFxStore.getState().fadeToBlack(250);
        await player.play();
        changeVideoPlayer(0);
        seconds = 17.25;
        newCurrentTime = seconds ?? 0;
        player.currentTime = newCurrentTime - 1.5;
        useFxStore.getState().unfadeToBlack(5);
    } else if (newScene.id.includes("M")) {
        await useFxStore.getState().fadeToBlack(250);
        await player.play();
        changeVideoPlayer(0);
        newCurrentTime = 0;
        player.currentTime = newCurrentTime;
        await useFxStore.getState().unfadeToBlack(250);
    } else {
        await player.play();
        changeVideoPlayer(150);
    }

    function changeVideoPlayer(delay: number = 0) {
        console.log("Video players: ", videoPlayers);
        setTimeout(() => {
            videoPlayers.forEach((videoPlayer) => {
                if (videoPlayer === player) return;
                videoPlayer.style.opacity = "0";
                videoPlayer.pause();
                videoPlayer.style.zIndex = "-1000";
            });

            player.style.opacity = "1";
            player.style.zIndex = "10";
        }, delay)
    }

    useGameGlobalsStore.getState().app.stage.children.forEach((child: PIXI.Container | PIXI.Graphics) => {
        if (child.label === "videoSprite") {
            child.visible = false;
        }
    });

    // Activating scene
    newScene.isActive = true;
    set({ ...get(), currentScene: newScene });
    get().setSceneEvents(new Set(newScene.sceneEvents?.map(event => event.name) ?? []));

    // End previous scene
    const newDate = new Date();

    if (currentScene) {
        useGameSessionStore.getState().endScene(currentScene, newDate);
    } else {
        console.warn("Can't end previous scene in session. No previous scene found");
    }

    // Add scene to session
    useGameSessionStore.getState().startScene(newScene, newDate);

    if (!loadNextScenes) {
        const { stagedScenes } = get();
        stagedScenes.forEach(scene => {
            if (scene.id === newScene?.id) return console.log("Skipping loading next scenes. Scene already loaded.");
            if (scene.nextScenes.includes(newScene?.id ?? "")) return console.log("Skipping loading next scenes. Scene already loaded.");

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
        const displaySkipIntro = window.localStorage.getItem("shouldDisplaySkip") === "true";
        if (!displaySkipIntro && hitboxConfig.name === "HB-H0") return console.log("Skipping hitbox HB-H0 first time!");
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

    const nextScenes = newScene.nextScenes;

    const coins = useGameGlobalsStore.getState().coins;
    if (coins >= 0 && coins <= 9) {
        nextScenes.push("M" + coins);
    }

    // Add next scenes
    nextScenes.forEach(nextSceneId => {
        get().addNewScene(nextSceneId);
    });

    if (!newScene.id.includes("H0")) {
        const videoPlayer = newScene.video.player as HTMLVideoElement;
        videoPlayer.muted = false;
    } else {
        const videoPlayer = newScene.video.player as HTMLVideoElement;
        videoPlayer.muted = false;
        videoPlayer.volume = 0;
    }
}

export default handleSwitchToScene;
