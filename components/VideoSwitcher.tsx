import { useEffect, useMemo, useRef, useState } from "react";
import Hls from "hls.js";
import { useHLSPlayer } from "../hooks/useHLSPlayer";
import { usePixiStage } from "../hooks/usePixiStage";
import { sceneObjects } from "@/config/sceneConfig";
import { initializePixi } from "@/PixiJs/InitializePixi";
import { createDebugTimer } from "@/debug/debugTimer";
import { cleanupSprite } from "@/utils/cleanupSprite";
import { cleanupVideo } from "@/utils/cleanupVideo";
import { GameGlobals, StagedSceneObject, VideoSwitcherProps } from "../types";
import createSceneFromId from "@/logic/game/CreateSceneFromId";

const VideoSwitcher = (props: VideoSwitcherProps) => {
  const { gameGlobals, setGameGlobals, setStagedScenes, setCurrentSceneId } =
    props;
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

  // const filteredScenes = useMemo(() => {
  //   console.log("Filtering scenes...");
  //   return gameGlobals.stagedScenes.filter(
  //     (scene) => !scene.isReady && !scene.loading
  //   );
  // }, [gameGlobals.stagedScenes]);

  // console.log("Filtered scenes:", filteredScenes);

  // const stagedSceneIds = new Set();

  // useEffect(() => {
  //   console.log("Running useEffect...");
  //   filteredScenes.forEach((scene) => {
  //     if (!stagedSceneIds.has(scene.id)) {
  //       stagedSceneIds.add(scene.id);
  //       console.log("Adding new scene", scene.id);
  //       handleAddNewScene(scene.id, scene.autoplay || false);
  //     } else {
  //       console.log(`Scene ${scene.id} is already staged.`);
  //     }
  //   });
  // }, [filteredScenes]);

  const manuallyStageScenes = async () => {
    console.log(
      "Starting manually staging next scenes: ",
      gameGlobals.stagedScenes
    );
    gameGlobals.stagedScenes.forEach(async (scene) => {
      if (scene.isReady) {
        console.log(`Scene ${scene.id} is already staged.`);
      } else if (scene.loading) {
        console.log(`Scene ${scene.id} is already loading.`);
      } else {
        console.log("Adding new scene", scene.id);
        await handleAddNewScene(scene.id, scene.autoplay || false);
      }
    });
  };

  const loadingScenes = new Set();

  const handleAddNewScene = async (id: string, autoplay: boolean = false) => {
    if (loadingScenes.has(id)) {
      return console.warn("Scene is already being staged:", id);
    }

    loadingScenes.add(id);
    console.log("Staging scene:", id);

    gameGlobals.stagedScenes.forEach((scene) => {
      if (scene.id === id) {
        if (scene.isReady || scene.loading) {
          return console.warn("Scene already loaded. Aborting...");
        }
      }
    });

    const debugTimer = createDebugTimer(
      `Started loading scene ${id} at: `,
      `Finished loading scene ${id} at: `
    );
    debugTimer.start();

    const sceneObject = sceneObjects.find((scene) => scene.id === id);
    if (!sceneObject) throw new Error("Scene object not found!");

    const stagedScene: StagedSceneObject = {
      ...sceneObject,
      video: {
        player: null,
        hls: null,
        sprite: null,
      },
      loading: true,
      isActive: autoplay,
      isReady: false,
      clear: () => {
        cleanupVideo(stagedScene);
        cleanupSprite(stagedScene);
        console.log("%cClearing scene %c" + id, "color: orange", "color: cyan");
      },
    };

    let updatedScenes = gameGlobals.stagedScenes.map((scene) => {
      if (scene.id === id) return stagedScene;
      return scene;
    });

    // setStagedScenes(updatedScenes);

    try {
      const hlsVideo = await loadVideo(id);
      if (!hlsVideo?.video) throw new Error("Failed to load video!");
      updatedScenes = gameGlobals.stagedScenes.map((scene) => {
        if (scene.id === id) return stagedScene;
        return scene;
      });

      // setStagedScenes(updatedScenes);

      const sprite = await createVideoSprite(hlsVideo.video, appRef.current);

      stagedScene.video.sprite = sprite;
      stagedScene.video.player = hlsVideo.video;
      stagedScene.video.hls = hlsVideo.hls;

      updatedScenes = gameGlobals.stagedScenes.map((scene) => {
        if (scene.id === id) return stagedScene;
        return scene;
      });

      // setStagedScenes(updatedScenes);

      if (autoplay) {
        sprite.visible = true;
        stagedScene.video.player?.play();
        stagedScene.isActive = true;
        setCurrentSceneId(id);
      } else {
        sprite.visible = false;
        stagedScene.video.player?.pause();
        stagedScene.isActive = false;
      }

      stagedScene.isReady = true;
      stagedScene.loading = false;

      updatedScenes = gameGlobals.stagedScenes.map((scene) => {
        if (scene.id === id) return stagedScene;
        return scene;
      });

      setStagedScenes(updatedScenes);
      loadingScenes.delete(id);
      console.log("Finished staging scene:", id);

      debugTimer.stop();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadSceneById = (id: string, autoplay: boolean = false) => {
    const sceneAlreadyLoaded = gameGlobals.stagedScenes.find(
      (scene) => scene.id === id
    );

    if (sceneAlreadyLoaded)
      return console.warn("Scene already loaded. Aborting...");

    const newScene = createSceneFromId(id, autoplay);

    if (!newScene) return console.warn("Couldn't create scene. Aborting...");

    const newGameGlobals = {
      ...gameGlobals,
      currentScene: newScene,
      stagedScenes: [...gameGlobals.stagedScenes, newScene],
    };

    setGameGlobals(newGameGlobals);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center -z-10"
    >
      <button
        onClick={async () => {
          await manuallyStageScenes();
          console.log("Manually staged scenes: ", gameGlobals.stagedScenes);
        }}
      >
        Manually load next scenes
      </button>
      <div
        ref={canvasRef}
        className=""
        style={{
          aspectRatio: "16/9",
          maxHeight: "100vh",
          maxWidth: "100vw",
        }}
      />

      {gameGlobals.currentScene ? (
        false
      ) : (
        <button
          onClick={async () => {
            handleLoadSceneById("G0", true);
          }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded z-10"
        >
          {"Load G0"}
        </button>
      )}

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
