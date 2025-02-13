import VideoSwitcher from "./VideoSwitcher";
import SceneLoadingIndicators from "./SceneLoadingIndicators";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useState } from "react";
import useDebugStore from "@/stores/debug/debugStore";
import DebugMenu from "./DebugMenu";
import DebugInfo from "./DebugInfo";
import HitboxManager from "./HitboxManager";
import removeAllHitboxes from "@/PixiJs/removeAllHitboxes";
import MusicPlayer from "./MusicPlayer";
import DisplaySkipIntro from "./DisplaySkipIntro";
import SceneEventManager from "./SceneEventManager";
import useFxStore from "@/stores/FX/fxStore";
import useGameSessionStore from "@/stores/gameSession/gameSession";
import CoinCounter from "./CoinCounter";

export default function Game() {
  const gameGlobals = useGameGlobalsStore();
  const [initialSceneLoaded, setInitialSceneLoaded] = useState(false);
  const [initialScenePlaying, setInitialScenePlaying] = useState(false);

  const { showCoins } = useDebugStore();

  // Cleanup hitboxes when the app is destroyed
  useEffect(() => {
    return () => {
      if (gameGlobals.app) {
        removeAllHitboxes();
      }
    };
  }, [gameGlobals.app]);

  useEffect(() => {
    if (!gameGlobals.app) return;
    if (!initialSceneLoaded) {
      gameGlobals.addNewScene("G0");
      setInitialSceneLoaded(true);
      useFxStore.getState().initiateFadePlate();
      useGameSessionStore.getState().clearSession();
    }

    // TODO: Can we find a more elegant solution? I don't like the timer.
    if (!initialScenePlaying) {
      setTimeout(() => {
        gameGlobals.switchToScene("G0");
        setInitialScenePlaying(true);
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
    <div className="w-full h-full overflow-hidden">
      <VideoSwitcher />
      <DebugMenu />
      {showDebugInfo && <DebugInfo />}
      <HitboxManager />
      <DisplaySkipIntro />
      {showLoadingIndicators && <SceneLoadingIndicators />}
      <SceneEventManager />
      {showCoins && <CoinCounter />}
    </div>
  );
}
