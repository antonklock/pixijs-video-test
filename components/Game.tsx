import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import removeAllHitboxes from "@/PixiJs/removeAllHitboxes";
import useDebugStore from "@/stores/debug/debugStore";
import SceneEventManager from "./SceneEventManager";
import DisplaySkipIntro from "./DisplaySkipIntro";
import useFxStore from "@/stores/FX/fxStore";
import VideoSwitcher from "./VideoSwitcher";
import HitboxManager from "./HitboxManager";
import DebugInfo from "./DebugInfo";
import { useEffect } from "react";
import * as PIXI from "pixi.js";

export default function Game() {
  const gameGlobals = useGameGlobalsStore();

  useEffect(() => {
    useFxStore.getState().initiateFadePlate();
    gameGlobals.setGameState("playing");
    // console.log("Fade plate initiated");
  }, []);

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

    const coins = gameGlobals.coins;

    if (gameGlobals.currentScene?.id === "H0" && coins >= 0) {
      const coinContainer = gameGlobals.app.stage.children.find(
        (child: PIXI.Container) => child.label === "coinContainer"
      );
      if (coinContainer) {
        coinContainer.alpha = 0;
        const fadeIn = () => {
          if (coinContainer.alpha < 1) {
            coinContainer.alpha += 0.1;
            requestAnimationFrame(fadeIn);
          } else {
            coinContainer.interactive = true;
            coinContainer.cursor = "hover";

            // console.log("Coin container faded in");
          }
        };
        fadeIn();
      }
    } else {
      const coinContainer = gameGlobals.app.stage.children.find(
        (child: PIXI.Container) => child.label === "coinContainer"
      );
      if (coinContainer && coinContainer.alpha > 0) {
        coinContainer.alpha = 1;
        const fadeOut = () => {
          if (coinContainer.alpha > 0) {
            coinContainer.alpha -= 0.1;
            requestAnimationFrame(fadeOut);
          } else {
            coinContainer.interactive = false;
            coinContainer.cursor = "default";

            // console.log("Coin container faded out");
          }
        };
        fadeOut();
      }
    }
  }, [gameGlobals.currentScene]);

  const { showDebugInfo } = useDebugStore();

  return (
    <div className="relative top-0 left-0 w-full h-full overflow-hidden">
      <VideoSwitcher />
      {showDebugInfo && <DebugInfo />}
      <HitboxManager />
      <DisplaySkipIntro />
      <SceneEventManager />
    </div>
  );
}
