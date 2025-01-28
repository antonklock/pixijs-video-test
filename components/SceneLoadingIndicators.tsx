import React from "react";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

const SceneLoadingIndicators = () => {
  const gameGlobals = useGameGlobalsStore();
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="absolute h-10 w-full top-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
        {gameGlobals.stagedScenes.map((scene, index) => (
          <div
            className="flex items-center justify-center"
            key={`indicator-container-${scene.id}-${index}`}
          >
            <button
              className={`w-12 h-12 z-50 text-white flex items-center justify-center rounded-full border-white/25 border-2 ${(() => {
                if (!scene.isReady) {
                  return "bg-red-500 border-red-800 border-4";
                }
                if (!scene.isActive) {
                  return "bg-yellow-500 border-green-600 text-black font-bold relative hover:after:content-['✕'] hover:after:absolute hover:after:text-red-500/50 hover:after:font-bold hover:after:text-2xl group";
                }
                if (scene.isReady && scene.isActive) {
                  return "bg-green-400 border-green-200 relative hover:after:content-['✕'] hover:after:absolute hover:after:text-red-500/50 hover:after:font-bold hover:after:text-2xl group";
                }
                return "bg-green-400 border-green-200";
              })()}`}
              key={`indicator-${scene.id}-${index}`}
              id={`indicator-${scene.id}`}
              onClick={() => {
                gameGlobals.stagedScenes
                  .find((stagedScene) => stagedScene.id === scene.id)
                  ?.clear();
                const newStagedScenes = gameGlobals.stagedScenes.filter(
                  (stagedScene) => stagedScene.id !== scene.id
                );
                gameGlobals.setStagedScenes(newStagedScenes);
              }}
            >
              <span className={scene.isReady ? "group-hover:opacity-0" : ""}>
                {scene.id}
              </span>
            </button>
            {scene.isReady && !scene.isActive && (
              <button
                key={`play-${scene.id}`}
                className="bg-white-400/25 border-green-400 border-2 text-green-400 px-4 py-2 rounded-e-lg -translate-x-3 pl-4"
                onClick={() => {
                  gameGlobals.switchToScene(scene.id);
                }}
              >
                <p className="text-sm translate-x-1">Play</p>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SceneLoadingIndicators;
