import { useEffect, useMemo, useRef, useState } from "react";
import Hls from "hls.js";
// import { useHLSPlayer } from "../hooks/useHLSPlayer";
import { usePixiStage } from "../hooks/usePixiStage";
import { sceneObjects } from "@/config/sceneConfig";
import { initializePixi } from "@/PixiJs/InitializePixi";
import { createDebugTimer } from "@/debug/debugTimer";
import { cleanupSprite } from "@/utils/cleanupSprite";
import { cleanupVideo } from "@/utils/cleanupVideo";
import { StagedSceneObject } from "../types";
import createSceneFromId from "@/logic/game/CreateSceneFromId";
import useGameGlobalsStore from "@/stores/gameGlobals";

const VideoSwitcher = () => {
  const gameGlobals = useGameGlobalsStore();

  const [errors, setErrors] = useState<string[]>([]);
  const initializationRef = useRef(false);

  const videosRef = useRef<HTMLVideoElement[] | null[]>([]);
  const hlsInstancesRef = useRef<Hls[] | null[]>([]);

  const addError = (error: string) => {
    setErrors((prev) => [...prev, error]);
  };

  const { containerRef, canvasRef, appRef, videoSpritesRef, dimensions } =
    usePixiStage({ onError: addError });

  // Initialize Pixi
  useEffect(() => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    const createPixiApp = async () => {
      const { app, canvas } = await initializePixi(dimensions);

      if (!canvas || !canvasRef.current || !app) return;
      canvasRef.current.appendChild(canvas);
      appRef.current = app;

      gameGlobals.setApp(app);
      gameGlobals.setCanvas(canvas);
    };

    createPixiApp();

    return cleanup;
  }, []);

  const cleanup = () => {
    gameGlobals.stagedScenes.forEach((scene) => scene.clear());

    if (appRef.current) {
      appRef.current.destroy(true, { children: true, texture: true });
      appRef.current = undefined;
    }

    if (canvasRef.current) {
      while (canvasRef.current.firstChild) {
        canvasRef.current.removeChild(canvasRef.current.firstChild);
      }
    }

    videosRef.current = [];
    hlsInstancesRef.current = [];
    videoSpritesRef.current = [];
  };

  useEffect(() => {
    console.log("Game globals: ", gameGlobals);
  }, [gameGlobals]);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center -z-10"
    >
      <div
        ref={containerRef}
        className=""
        style={{
          aspectRatio: "16/9",
          maxHeight: "100vh",
          maxWidth: "100vw",
        }}
      />

      {gameGlobals.currentScene ? false : <></>}

      {errors.length > 0 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 mt-4 p-4 bg-red-100 text-red-700 rounded z-10">
          {errors.map((error, index) => (
            <div key={`${error}-${index}`}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoSwitcher;
