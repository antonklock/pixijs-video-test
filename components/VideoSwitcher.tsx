import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useHLSPlayer } from "../hooks/useHLSPlayer";
import { usePixiStage } from "../hooks/usePixiStage";
import { sceneObjects } from "@/config/sceneConfig";
import { initializePixi } from "@/PixiJs/InitializePixi";
import { createDebugTimer } from "@/debug/debugTimer";
import { cleanupSprite } from "@/utils/cleanupSprite";
import { cleanupVideo } from "@/utils/cleanupVideo";
import { StagedSceneObject, VideoSwitcherProps } from "../types";

const VideoSwitcher = (props: VideoSwitcherProps) => {
  const { gameGlobals, setStagedScenes } = props;
  const [errors, setErrors] = useState<string[]>([]);
  const initializationRef = useRef(false);

  const videosRef = useRef<HTMLVideoElement[] | null[]>([]);
  const hlsInstancesRef = useRef<Hls[] | null[]>([]);

  const addError = (error: string) => {
    setErrors((prev) => [...prev, error]);
  };

  const { loadVideo } = useHLSPlayer({
    onError: addError,
    videosRef,
    hlsInstancesRef,
  });

  const {
    containerRef,
    canvasRef,
    appRef,
    videoSpritesRef,
    dimensions,
    setDimensions,
    calculateDimensions,
    createVideoSprite,
  } = usePixiStage({ onError: addError });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newDimensions = calculateDimensions();
      setDimensions(newDimensions);

      if (appRef.current) {
        appRef.current.renderer.resize(
          newDimensions.width,
          newDimensions.height
        );
        videoSpritesRef.current.forEach((sprite) => {
          if (sprite) {
            sprite.width = newDimensions.width;
            sprite.height = newDimensions.height;
          }
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [appRef, calculateDimensions, setDimensions, videoSpritesRef]);

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

  // Initialize Pixi
  useEffect(() => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    const createPixiApp = async () => {
      const { app, canvas } = await initializePixi(dimensions);

      if (!canvas || !canvasRef.current || !app) return;
      canvasRef.current.appendChild(canvas);
      appRef.current = app;
    };

    createPixiApp();

    return cleanup;
  }, []);

  const handleAddNewScene = async (id: string, autoplay: boolean = false) => {
    const debugTimer = createDebugTimer(
      `Started loading scene ${id} at: `,
      `Finished loading scene ${id} at: `
    );
    debugTimer.start();

    if (gameGlobals.stagedScenes.find((scene) => scene.id === id))
      return console.warn("Scene already staged. Aborting...");

    const sceneObject = sceneObjects.find((scene) => scene.id === id);
    if (!sceneObject) throw new Error("Scene object not found!");

    const stagedScene: StagedSceneObject = {
      ...sceneObject,
      video: {
        player: null,
        hls: null,
        sprite: null,
      },
      isActive: false,
      isReady: false,
      clear: () => {
        cleanupVideo(stagedScene);
        cleanupSprite(stagedScene);
        console.log("%cClearing scene %c" + id, "color: orange", "color: cyan");
      },
    };

    setStagedScenes([...gameGlobals.stagedScenes, stagedScene]);

    try {
      const hlsVideo = await loadVideo(id);
      if (!hlsVideo?.video) throw new Error("Failed to load video!");

      stagedScene.video.player = hlsVideo.video;
      stagedScene.video.hls = hlsVideo.hls;

      const sprite = await createVideoSprite(hlsVideo.video, appRef.current);
      stagedScene.video.sprite = sprite;

      if (autoplay) {
        sprite.visible = true;
        stagedScene.video.player?.play();
        stagedScene.isActive = true;
      }

      stagedScene.isReady = true;

      const newStagedScenes = [...gameGlobals.stagedScenes, stagedScene];
      setStagedScenes(newStagedScenes);

      debugTimer.stop();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center -z-10"
    >
      <div
        ref={canvasRef}
        className=""
        style={{
          aspectRatio: "16/9",
          maxHeight: "100vh",
          maxWidth: "100vw",
        }}
      />

      <>
        <button
          onClick={async () => {
            handleAddNewScene("H0", false);
          }}
          className="absolute bottom-4 left-2/3 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded z-10"
        >
          {"Load H0"}
        </button>
        <button
          onClick={async () => {
            handleAddNewScene("G0", true);
          }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded z-10"
        >
          {"Load G0"}
        </button>
      </>
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
