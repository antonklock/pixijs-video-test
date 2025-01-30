import VideoSwitcher from "./VideoSwitcher";
import SceneLoadingIndicators from "./SceneLoadingIndicators";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useState } from "react";
import addHitbox from "@/PixiJs/addHitbox";
import removeHitboxById from "@/PixiJs/removeHitbox";

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

        // addHitbox({
        //   x: 100,
        //   y: 100,
        //   width: 100,
        //   height: 100,
        //   onClick: () => {
        //     console.log("hitbox clicked");
        //     removeHitboxById("hitbox");
        //   },
        //   id: "hitbox",
        // });
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
