import VideoSwitcher from "./VideoSwitcher";
import SceneLoadingIndicators from "./SceneLoadingIndicators";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useState } from "react";
import useDebugStore from "@/stores/debug/debugStore";
import DebugMenu from "./DebugMenu";
import DebugInfo from "./DebugInfo";
import HitboxManager from "./HitboxManager";
import removeAllHitboxes from "@/PixiJs/removeAllHitboxes";
import DisplaySkipIntro from "./DisplaySkipIntro";
import SceneEventManager from "./SceneEventManager";
import useFxStore from "@/stores/FX/fxStore";
import useGameSessionStore from "@/stores/gameSession/gameSession";
import CoinCounter from "./CoinCounter";
import MusicPlayer from "./MusicPlayer";
import * as PIXI from "pixi.js";

export default function Game() {
  const gameGlobals = useGameGlobalsStore();

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
      <DebugMenu />
      {showDebugInfo && <DebugInfo />}
      <HitboxManager />
      <DisplaySkipIntro />
      <MusicPlayer />
      <SceneEventManager />
    </div>
  );
}
