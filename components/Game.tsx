import VideoSwitcher from "./VideoSwitcher";
import SceneLoadingIndicators from "./SceneLoadingIndicators";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useState } from "react";
import useDebugStore from "@/stores/debug/debugStore";
import DebugMenu from "./DebugMenu";
import DebugInfo from "./DebugInfo";

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

    // TODO: Can we find a more elegant solution? I don't like the timer.
    if (!initialScenePlaying) {
      setTimeout(() => {
        // gameGlobals.switchToScene("G0");
        // setInitialScenePlaying(true);
      }, 1000);
    }
  }, [
    gameGlobals.app,
    initialSceneLoaded,
    initialScenePlaying,
    gameGlobals.currentScene?.isReady,
    gameGlobals,
  ]);

  const { showLoadingIndicators, showDebugInfo } = useDebugStore();

  return (
    <div className="w-full h-full">
      {showLoadingIndicators && <SceneLoadingIndicators />}
      <VideoSwitcher />
      <DebugMenu />
      {showDebugInfo && <DebugInfo />}
    </div>
  );
}
