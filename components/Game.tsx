import { GameGlobals, StagedSceneObject } from "@/types";
import { useEffect, useState } from "react";
import VideoSwitcher from "./VideoSwitcher";
import { sceneObjects } from "@/config/sceneConfig";
import { cleanupSprite } from "@/utils/cleanupSprite";
import { cleanupVideo } from "@/utils/cleanupVideo";
import SceneLoadingIndicators from "./SceneLoadingIndicators";

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
    setGameGlobals((prev) => ({ ...prev, currentSceneId: scene }));
  };

  useEffect(() => {
    console.log("gameGlobals.stagedScenes:", gameGlobals.stagedScenes);
  }, [gameGlobals.stagedScenes]);

  // useEffect(() => {
  //   gameGlobals.stagedScenes.forEach((scene) => {
  //     if (scene.id === gameGlobals.currentSceneId) {
  //       scene.isActive = true;
  //       scene.video.sprite.visible = true;
  //     } else {
  //       scene.isActive = false;
  //       scene.video.sprite.visible = false;
  //     }
  //   });
  // }, [gameGlobals.currentSceneId]);

  //   useEffect(() => {
  //     if (!gameGlobals.currentSceneId) return;
  //     if (gameGlobals.stagedScenes.length < 1) return;

  //     // TODO: ONLY LOAD NEXT SCENES OF ACTIVE SCENE

  //     const stagedScenes = gameGlobals.stagedScenes;
  //     console.log("stagedScenes:", stagedScenes);

  //     console.log("Waiting to unload scenes...");
  //     setTimeout(() => console.log("Unloading scenes..."), 1000);
  //     let activeScenes: StagedSceneObject[] | undefined =
  //       gameGlobals.stagedScenes.filter(
  //         (scene) => scene.id !== gameGlobals.currentSceneId
  //       );

  //     setStagedScenes(activeScenes);

  //     console.log("Waiting to load scenes...");
  //     setTimeout(() => console.log("Loading scenes..."), 1000);
  //     let activeScene = gameGlobals.stagedScenes.find(
  //       (scene) => scene.id === gameGlobals.currentSceneId
  //     );
  //     if (!activeScene)
  //       return console.warn(
  //         "No active scene. Need active scene to load next scenes."
  //       );

  //     activeScene.nextScenes.forEach((sceneId) => {
  //       const nextScene = sceneObjects.find((scene) => scene.id === sceneId);
  //       if (!nextScene) return console.error("Next scene not found!");

  //       const stagedScene: StagedSceneObject = {
  //         ...nextScene,
  //         video: {
  //           player: null,
  //           hls: null,
  //           sprite: null,
  //         },
  //         loading: false,
  //         isActive: false,
  //         isReady: false,
  //         clear: () => {
  //           cleanupVideo(stagedScene);
  //           cleanupSprite(stagedScene);
  //           console.log(
  //             "%cClearing scene %c" + sceneId,
  //             "color: orange",
  //             "color: cyan"
  //           );
  //         },
  //       };

  //       setStagedScenes([...activeScenes, stagedScene]);
  //     });
  //   }, [gameGlobals.currentSceneId]);

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
