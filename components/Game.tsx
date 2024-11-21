import { GameGlobals, StagedSceneObject } from "@/types";
import { useEffect, useState } from "react";
import VideoSwitcher from "./VideoSwitcher";
import { sceneObjects } from "@/config/sceneConfig";
import { cleanupSprite } from "@/utils/cleanupSprite";
import { cleanupVideo } from "@/utils/cleanupVideo";

export default function Game() {
  const [gameGlobals, setGameGlobals] = useState<GameGlobals>({
    isGameRunning: false,
    stagedScenes: [],
    currentSceneId: null,
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
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="absolute h-10 w-full top-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
          {gameGlobals.stagedScenes.map((scene) => (
            <button
              className={`w-12 h-12 z-50 text-white flex items-center justify-center rounded-full border-white/25 border-2 ${
                scene.isReady
                  ? !scene.isActive
                    ? "bg-yellow-500/25 border-green-600/50"
                    : "bg-green-400 border-green-200"
                  : "bg-red-500 border-red-800 border-4"
              }`}
              key={scene.id}
              id={`indicator-${scene.id}`}
              onClick={() => {
                gameGlobals.stagedScenes
                  .find((stagedScene) => stagedScene.id === scene.id)
                  ?.clear();
                const newStagedScenes = gameGlobals.stagedScenes.filter(
                  (stagedScene) => stagedScene.id !== scene.id
                );
                setStagedScenes(newStagedScenes);
              }}
            >
              {scene.id}
            </button>
          ))}
        </div>
      </div>

      {/* MOVE PIXI STAGE HERE */}

      <VideoSwitcher
        gameGlobals={gameGlobals}
        setGameGlobals={setGameGlobals}
        setStagedScenes={setStagedScenes}
        setCurrentSceneId={setCurrentScene}
      />
    </>
  );
}
