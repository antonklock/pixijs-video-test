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

export default function Game() {
  const gameGlobals = useGameGlobalsStore();
  const [initialSceneLoaded, setInitialSceneLoaded] = useState(false);
  const [initialScenePlaying, setInitialScenePlaying] = useState(false);

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

  // useEffect(() => {
  //   if (gameGlobals.currentScene) {
  //     const sceneEventNames =
  //       gameGlobals.currentScene.sceneEvents?.map((event) => event.name) ?? [];
  //     gameGlobals.setSceneEvents(new Set(sceneEventNames));
  //     console.log("Scene events set:", sceneEventNames);
  //   }
  // }, [gameGlobals.currentScene]);

  const { showLoadingIndicators, showDebugInfo } = useDebugStore();

  return (
    <div className="w-full h-full overflow-hidden">
      <VideoSwitcher />
      <DebugMenu />
      {showDebugInfo && <DebugInfo />}
      <HitboxManager />
      {gameGlobals.isGameRunning && <MusicPlayer />}
      <DisplaySkipIntro />
      {showLoadingIndicators && <SceneLoadingIndicators />}
      <SceneEventManager />
      <p className="text-white text-2xl font-bold absolute bottom-10 right-10">
        Coins: {gameGlobals.coins}
      </p>
    </div>
  );
}
