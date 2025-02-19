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

export default function Game({
  initialScenePlaying,
  onStartGame,
}: {
  initialScenePlaying: boolean;
  onStartGame: () => void;
}) {
  const gameGlobals = useGameGlobalsStore();
  const [initialSceneLoaded, setInitialSceneLoaded] = useState(false);

  const { showCoins } = useDebugStore();

  // Cleanup hitboxes when the app is destroyed
  useEffect(() => {
    return () => {
      if (gameGlobals.app) {
        removeAllHitboxes();
      }
    };
  }, [gameGlobals.app]);

  // useEffect(() => {
  //   if (!gameGlobals.app) return;
  //   if (!initialSceneLoaded) {
  //     console.log("Adding new scene G0");
  //     gameGlobals.addNewScene("G0");
  //     setInitialSceneLoaded(true);
  //     useFxStore.getState().initiateFadePlate();
  //     useGameSessionStore.getState().clearSession();

  //     gameGlobals.setGameState("playing");

  //     // const gameContainer = document.getElementById("game-container");
  //     // if (gameContainer) {
  //     //   gameContainer.requestFullscreen();
  //     // }
  //   }

  //   // TODO: Can we find a more elegant solution? I don't like the timer.
  //   // if (!initialScenePlaying) {
  //   //   setTimeout(() => {
  //   //     gameGlobals.switchToScene("G0");
  //   //     setInitialScenePlaying(true);
  //   //   }, 4000);
  //   // }
  // }, [
  //   gameGlobals.app,
  //   initialSceneLoaded,
  //   initialScenePlaying,
  //   gameGlobals.currentScene?.isReady,
  //   gameGlobals,
  // ]);

  useEffect(() => {
    if (!gameGlobals.app) return;

    const coins = gameGlobals.coins;

    if (gameGlobals.currentScene?.id === "H0" && coins > 0) {
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
