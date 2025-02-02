import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { usePixiStage } from "../hooks/usePixiStage";
import { initializePixi } from "@/PixiJs/InitializePixi";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { initVideo } from "@/utils/loadVideo";

const VideoSwitcher = () => {
  const gameGlobals = useGameGlobalsStore();

  const playerRef_01 = useRef<HTMLVideoElement>(null);
  const playerRef_02 = useRef<HTMLVideoElement>(null);
  const playerRef_03 = useRef<HTMLVideoElement>(null);
  const playerRef_04 = useRef<HTMLVideoElement>(null);
  const playerRef_05 = useRef<HTMLVideoElement>(null);
  const playerRef_06 = useRef<HTMLVideoElement>(null);
  const playerRef_07 = useRef<HTMLVideoElement>(null);
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

    gameGlobals.videoPlayerRefs = [
      playerRef_01,
      playerRef_02,
      playerRef_03,
      playerRef_04,
      playerRef_05,
      playerRef_06,
      playerRef_07,
    ];

    return cleanup;
  }, []);

  const cleanup = () => {
    console.log("Cleaning up from VideoSwitcher");
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

    gameGlobals.videoPlayerRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.src = "";
        ref.current.load();
      }
    });
  };

  const videoPlayersContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gameGlobals.videoPlayerRefs.forEach((ref) => {
      const newVideoElement = document.createElement("video");
      const video = initVideo(newVideoElement);
      videoPlayersContainerRef.current?.appendChild(video);
      Object.assign(ref, { current: video });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center -z-10"
    >
      <div
        className=""
        style={{
          aspectRatio: "16/9",
          maxHeight: "100vh",
          maxWidth: "100vw",
        }}
      />

      <div className="video-players" ref={videoPlayersContainerRef} />

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
