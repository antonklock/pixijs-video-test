import { GameGlobals, StagedSceneObject } from "@/types";
import { useState } from "react";
import VideoSwitcher from "./VideoSwitcher";

export default function Game() {
  const [gameGlobals, setGameGlobals] = useState<GameGlobals>({
    isGameRunning: false,
    stagedScenes: [],
    currentScene: null,
  });

  const setStagedScenes = (scenes: StagedSceneObject[]) => {
    setGameGlobals({ ...gameGlobals, stagedScenes: scenes });
  };

  const setCurrentScene = (scene: StagedSceneObject | null) => {
    setGameGlobals({ ...gameGlobals, currentScene: scene });
  };

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
        setStagedScenes={setStagedScenes}
        setCurrentScene={setCurrentScene}
      />
    </>
  );
}
