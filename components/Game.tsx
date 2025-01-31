import VideoSwitcher from "./VideoSwitcher";
import SceneLoadingIndicators from "./SceneLoadingIndicators";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useState } from "react";
import useDebugStore from "@/stores/debug/debugStore";
import DebugMenu from "./DebugMenu";
// import ybpRyg from "@/public/music/ybp-ryg-01.wav";

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
  }, [
    gameGlobals.app,
    initialSceneLoaded,
    initialScenePlaying,
    gameGlobals.currentScene?.isReady,
    gameGlobals,
  ]);

  const { showLoadingIndicators } = useDebugStore();

  return (
    <div className="w-full h-full">
      {showLoadingIndicators && <SceneLoadingIndicators />}
      <VideoSwitcher />
      <DebugMenu />
      {/* <audio src={ybpRyg} autoPlay loop /> */}
    </div>
  );
}
