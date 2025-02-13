import Hls from "hls.js";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { initializePixi } from "@/PixiJs/InitializePixi";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { Dimensions } from "../types";

const VideoSwitcher = () => {
  const gameGlobals = useGameGlobalsStore();

  const initializationRef = useRef(false);

  const videosRef = useRef<HTMLVideoElement[] | null[]>([]);
  const hlsInstancesRef = useRef<Hls[] | null[]>([]);
  const videoSpritesRef = useRef<PIXI.Sprite[] | null[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<PIXI.Application>();

  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    scale: 1,
  });

  const calculateDimensions = () => {
    console.log("Calculating dimensions");

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const targetRatio = 16 / 9;

    let width = viewportWidth;
    let height = width / targetRatio;

    if (width > viewportWidth) {
      width = viewportWidth;
      height = width / targetRatio;
    }

    return {
      width: Math.floor(width),
      height: Math.floor(height),
      scale: Math.min(viewportWidth / width, viewportHeight / height),
    };
  };

  // Initialize Pixi
  useEffect(() => {
    if (initializationRef.current || appRef.current) return;
    initializationRef.current = true;

    const calculatedDimensions = calculateDimensions();
    setDimensions(calculatedDimensions);

    if (
      !gameGlobals.stageDimensions.width ||
      !gameGlobals.stageDimensions.height
    ) {
      gameGlobals.setStageDimensions({
        width: calculatedDimensions.width,
        height: calculatedDimensions.height,
      });
    }

    const createPixiApp = async () => {
      const { app, canvas } = await initializePixi(calculatedDimensions);
      if (!canvas || !containerRef.current || !app) return;

      const container = gameGlobals.pixiContainer;

      if (!container)
        return console.error("No pixi container found in gameGlobals");
      container.appendChild(canvas);
      appRef.current = app;

      // // Disable auto-resizing
      app.renderer.resize(
        calculatedDimensions.width,
        calculatedDimensions.height
      );

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
    <div ref={containerRef} className="fixed overflow-hidden bg-black -z-10" />
  );
};

export default VideoSwitcher;
