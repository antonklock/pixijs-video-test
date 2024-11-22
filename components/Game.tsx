import { GameGlobals, StagedSceneObject } from "@/types";
import { useEffect, useState } from "react";
import VideoSwitcher from "./VideoSwitcher";
import { sceneObjects } from "@/config/sceneConfig";
import { cleanupSprite } from "@/utils/cleanupSprite";
import { cleanupVideo } from "@/utils/cleanupVideo";
import SceneLoadingIndicators from "./SceneLoadingIndicators";
import createSceneFromId from "@/logic/game/CreateSceneFromId";

export default function Game() {
  const [gameGlobals, setGameGlobals] = useState<GameGlobals>({
    isGameRunning: false,
    stagedScenes: [],
    currentSceneId: null,
    app: null,
    canvas: null,
  });

  const setStagedScenes = (scenes: StagedSceneObject[]) => {
    setGameGlobals((prev) => ({ ...prev, stagedScenes: scenes }));
  };

  const setCurrentScene = (scene: string | null) => {
    if (!scene) return;
    gameGlobals.stagedScenes.forEach((stagedScene) => {
      if (stagedScene.id === gameGlobals.currentSceneId) {
        stagedScene.clear();
        const newStagedScenes = gameGlobals.stagedScenes.filter(
          (scene) => scene.id !== gameGlobals.currentSceneId
        );
        setStagedScenes(newStagedScenes);
      }
      setGameGlobals((prev) => ({ ...prev, currentSceneId: scene }));
    });
  };

  // useEffect(() => {
  //   console.log("gameGlobals.stagedScenes:", gameGlobals.stagedScenes);
  // }, [gameGlobals.stagedScenes]);

  useEffect(() => {
    if (!gameGlobals.currentSceneId) return;
    const nextScenesIds = sceneObjects.find(
      (scene) => scene.id === gameGlobals.currentSceneId
    )?.nextScenes;
    if (!nextScenesIds)
      return console.warn(
        "No next scenes found for current scene. Aborting..."
      );

    console.log("nextScenesIds:", nextScenesIds);

    const newScenes = nextScenesIds.map((sceneId) => {
      const sceneIsStaged = gameGlobals.stagedScenes.find(
        (scene) => scene.id === sceneId
      );

      if (sceneIsStaged) {
        console.warn(`Scene ${sceneId} is already loaded. Aborting...`);
        return undefined;
      }

      const sceneToAdd = createSceneFromId(sceneId, false);
      if (!sceneToAdd) {
        console.warn("Failed to create scene. Aborting...");
        return undefined;
      }

      return sceneToAdd;
    });

    // const filteredScenes = [...gameGlobals.stagedScenes, ...newScenes].filter(
    //   (scene) => scene !== undefined
    // );
    const newScene = newScenes[0];
    if (!newScene) return;
    const filteredScenes = [...gameGlobals.stagedScenes, newScene];
    setStagedScenes(filteredScenes);
  }, [gameGlobals.currentSceneId]);

  return (
    <>
      <SceneLoadingIndicators
        gameGlobals={gameGlobals}
        setStagedScenes={setStagedScenes}
        setCurrentSceneId={setCurrentScene}
      />

      <VideoSwitcher
        gameGlobals={gameGlobals}
        setGameGlobals={setGameGlobals}
        setStagedScenes={setStagedScenes}
        setCurrentSceneId={setCurrentScene}
      />
    </>
  );
}
