import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { usePixiStage } from "../hooks/usePixiStage";
import { initializePixi } from "@/PixiJs/InitializePixi";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { initVideo } from "@/utils/loadVideo";

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

    gameGlobals.videoPlayers.forEach((videoElement) => {
      if (videoElement) {
        videoElement.classList.remove("video-");
        while (videoElement.firstChild) {
          videoElement.removeChild(videoElement.firstChild);
        }
      }
    });
  };

  const videoPlayersContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameGlobals.videoPlayers.length > 0) return;
    for (let i = 0; i < 7; i++) {
      const newVideoElement = document.createElement("video");
      const video = initVideo(newVideoElement);
      gameGlobals.videoPlayers.push(video);
      videoPlayersContainerRef.current?.appendChild(video);
    }
  }, []);

  useEffect(() => {
    console.log("Video players", gameGlobals.videoPlayers);
  }, [gameGlobals.videoPlayers]);

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
