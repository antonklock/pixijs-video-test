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
    scenesToStage: [],
    // currentSceneId: null,
    currentScene: null,
    app: null,
    canvas: null,
  });

  const setStagedScenes = (scenes: StagedSceneObject[]) => {
    setGameGlobals((prev) => ({ ...prev, stagedScenes: scenes }));
  };

  const setCurrentScene = (scene: string | null) => {
    if (!scene) return;
    gameGlobals.stagedScenes.forEach((stagedScene) => {
      if (stagedScene.id === gameGlobals.currentScene?.id) {
        stagedScene.clear();
        const newStagedScenes = gameGlobals.stagedScenes.filter(
          (scene) => scene.id !== gameGlobals.currentScene?.id
        );
        setStagedScenes(newStagedScenes);
      }
    });
    setGameGlobals(
      (prev) => ({ ...prev, currentSceneId: scene } as GameGlobals)
    );
  };

  const handleLoadSceneById = (id: string, autoplay: boolean = false) => {
    const sceneAlreadyLoaded = gameGlobals.stagedScenes.find(
      (scene) => scene.id === id
    );

    if (sceneAlreadyLoaded)
      return console.warn("Scene already loaded. Aborting...");

    const newScene = createSceneFromId(id, autoplay);

    if (!newScene) return console.warn("Couldn't create scene. Aborting...");

    // setGameGlobals((prev) => ({
    //   ...prev,
    //   currentScene: newScene,
    // }));

    // setStagedScenes((prev) => [...prev, newScene]);
    setStagedScenes([...gameGlobals.stagedScenes, newScene]);
  };

  const loadH0 = () => {
    const newScene = createSceneFromId("H0", false);
    const newScene2 = createSceneFromId("H1", false);
    const newScene3 = createSceneFromId("H2", false);
    const newScene4 = createSceneFromId("H3", false);
    const newScene5 = createSceneFromId("H4", false);
    const newScene6 = createSceneFromId("H5", false);
    if (
      !newScene ||
      !newScene2 ||
      !newScene3 ||
      !newScene4 ||
      !newScene5 ||
      !newScene6
    )
      return console.warn("Couldn't create scene. Aborting...");

    setStagedScenes([
      ...gameGlobals.stagedScenes,
      newScene,
      newScene2,
      newScene3,
      newScene4,
      newScene5,
      newScene6,
    ]);
  };

  // useEffect(() => {
  //   console.log("Current scene id:", gameGlobals.currentScene?.id);

  //   const nextScenes = sceneObjects.find(
  //     (scene) => scene.id === gameGlobals.currentScene?.id
  //   )?.nextScenes;

  //   console.log("nextScenes:", nextScenes);

  //   if (!nextScenes) return;

  //   const newScene = createSceneFromId(nextScenes[0], false);

  //   console.log("newScene:", newScene);

  //   if (!newScene) return console.warn("Couldn't create scene. Aborting...");

  //   setStagedScenes([...gameGlobals.stagedScenes, newScene]);

  //   // nextScenes.forEach((scene) => {
  //   //   handleLoadSceneById(scene, false);
  //   // });
  // }, [gameGlobals.currentScene]);

  // useEffect(() => {
  //   if (!gameGlobals.currentScene)
  //     return console.warn("No current scene found. Aborting...");

  //   const nextScenes = sceneObjects.find(
  //     (scene) => scene.id === gameGlobals.currentScene?.id
  //   )?.nextScenes;

  //   console.log("nextScenes:", nextScenes);

  //   if (!nextScenes) return console.warn("No next scenes found. Aborting...");

  //   setGameGlobals((prev) => ({ ...prev, scenesToStage: nextScenes }));

  //   console.log("scenesToStage:", gameGlobals.scenesToStage);
  //   console.log("currentScene:", gameGlobals.currentScene);
  // }, [gameGlobals.currentScene]);

  // useEffect(() => {
  //   console.log("scenesToStage:", gameGlobals.scenesToStage);

  //   if (gameGlobals.scenesToStage.length === 0) return;

  //   const nextScene = gameGlobals.scenesToStage[0];
  //   const newScene = createSceneFromId(nextScene, false);

  //   if (!newScene) return console.warn("Couldn't create scene. Aborting...");

  //   console.log("Staged scenes:", [...gameGlobals.stagedScenes, newScene]);

  //   setStagedScenes([...gameGlobals.stagedScenes, newScene]);

  //   const newScenesToStage = gameGlobals.scenesToStage.filter(
  //     (scene) => scene !== nextScene
  //   );

  //   setGameGlobals((prev) => ({
  //     ...prev,
  //     scenesToStage: newScenesToStage,
  //   }));
  // }, [gameGlobals.scenesToStage]);

  // useEffect(() => {
  //   if (!gameGlobals.currentSceneId) return;
  //   const nextScenesIds = sceneObjects.find(
  //     (scene) => scene.id === gameGlobals.currentSceneId
  //   )?.nextScenes;
  //   if (!nextScenesIds)
  //     return console.warn(
  //       "No next scenes found for current scene. Aborting..."
  //     );

  //   console.log("nextScenesIds:", nextScenesIds);

  //   const newScenes = nextScenesIds.map((sceneId) => {
  //     const sceneIsStaged = !!gameGlobals.stagedScenes.find(
  //       (scene) => scene.id === sceneId
  //     );

  //     console.log("Checking scene:", sceneId);
  //     console.log("sceneIsStaged:", sceneIsStaged);
  //     console.log("gameGlobals.stagedScenes:", gameGlobals.stagedScenes);

  //     if (sceneIsStaged) {
  //       console.warn(`Scene ${sceneId} is already loaded. Aborting...`);
  //       return undefined;
  //     }

  //     const sceneToAdd = createSceneFromId(sceneId, false);
  //     if (!sceneToAdd) {
  //       console.warn("Failed to create scene. Aborting...");
  //       return undefined;
  //     }

  //     return sceneToAdd;
  //   });

  //   // const newScene = newScenes.find((scene) => scene !== undefined);
  //   const newScene = newScenes.find((scene) => scene !== undefined);
  //   console.log("newScene:", newScene);

  //   if (!newScene) return;
  //   if (newScene.id !== "H0" && newScene.id !== "H1" && newScene.id !== "H2")
  //     return;
  //   // const newScene = newScenes[0];
  //   // if (!newScene) return;
  //   const filteredScenes = [...gameGlobals.stagedScenes, newScene];
  //   setStagedScenes(filteredScenes);
  // }, [gameGlobals.currentSceneId, gameGlobals.stagedScenes]);

  return (
    <>
      <button onClick={loadH0}>Load H0</button>

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
        handleLoadSceneById={handleLoadSceneById}
      />
    </>
  );
}
