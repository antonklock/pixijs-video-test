import VideoSwitcher from "./VideoSwitcher";
import SceneLoadingIndicators from "./SceneLoadingIndicators";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useState } from "react";

export default function Game() {
  const gameGlobals = useGameGlobalsStore();
  const [initialSceneLoaded, setInitialSceneLoaded] = useState(false);
  const [initialScenePlaying, setInitialScenePlaying] = useState(false);

  useEffect(() => {
    if (!gameGlobals.app) return;
    if (!initialSceneLoaded) {
      gameGlobals.addNewScene("G0");
      setInitialSceneLoaded(true);
    }

    // TODO: Fix a more elegant solution
    if (!initialScenePlaying && initialSceneLoaded) {
      setTimeout(() => {
        gameGlobals.switchToScene("G0");
        setInitialScenePlaying(true);
      }, 2000);
    }
  }, [
    gameGlobals.app,
    initialSceneLoaded,
    initialScenePlaying,
    gameGlobals.currentScene?.isReady,
    gameGlobals,
  ]);

  return (
    <div className="w-full h-full">
      <SceneLoadingIndicators />
      <VideoSwitcher />
    </div>
  );
}
