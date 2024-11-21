import { GameGlobals, SceneObject } from "@/types";
import { useState } from "react";
import VideoSwitcher from "./VideoSwitcher";

export default function Game() {
  const [gameGlobals, setGameGlobals] = useState<GameGlobals>({
    isGameRunning: false,
    stagedScenes: [],
    currentScene: null,
  });

  const setStagedScenes = (scenes: SceneObject[]) => {
    setGameGlobals({ ...gameGlobals, stagedScenes: scenes });
  };

  const setCurrentScene = (scene: SceneObject | null) => {
    setGameGlobals({ ...gameGlobals, currentScene: scene });
  };

  return (
    <>
      {/* MOVE PIXI STAGE HERE */}
      <VideoSwitcher
        setPendingVideos={setPendingVideos}
        pendingVideos={pendingVideos}
        gameGlobals={gameGlobals}
        setStagedScenes={setStagedScenes}
        setCurrentScene={setCurrentScene}
      />
    </>
  );
}
