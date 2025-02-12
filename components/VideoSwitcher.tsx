import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { usePixiStage } from "../hooks/usePixiStage";
import { initializePixi } from "@/PixiJs/InitializePixi";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

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

      if (!canvas || !containerRef.current || !app) return;
      containerRef.current.appendChild(canvas);
      appRef.current = app;

      gameGlobals.setApp(app);
      gameGlobals.setCanvas(canvas);
    };

    createPixiApp();

    gameGlobals.stagedScenes.forEach((scene) =>
      gameGlobals.unstageScene(scene.id)
    );

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

    gameGlobals.setApp(null);
    gameGlobals.setCanvas(null);

    gameGlobals.setCurrentScene(null);

    gameGlobals.stagedScenes.forEach((scene) => scene.clear());

    console.log("Cleanup");
  };

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center -z-10"
      >
        <div
          style={{
            aspectRatio: "16/9",
            maxHeight: "100vh",
            maxWidth: "100vw",
          }}
        />
      </div>
    </>
  );
};

export default VideoSwitcher;
