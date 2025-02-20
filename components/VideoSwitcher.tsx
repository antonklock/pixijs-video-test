import Hls from "hls.js";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { initializePixi } from "@/PixiJs/InitializePixi";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { Dimensions } from "../types";
import * as Tone from "tone";
import calculateStageDimensions from "@/utils/calculateStageDimensions";

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

  useEffect(() => {
    if (Tone.getTransport().state !== "started") {
      Tone.start();
    }
  }, []);

  // Initialize Pixi
  useEffect(() => {
    if (initializationRef.current === true || appRef.current) return;
    initializationRef.current = true;

    const createPixiApp = async () => {
      const container = document.getElementById(
        "pixi-container"
      ) as HTMLDivElement;
      if (!container) return console.warn("Container not found");

      const { app, canvas, dimensions } = await initializePixi({
        parentElement: container,
      });
      if (!canvas || !containerRef.current || !app)
        return console.warn("Pixi app failed to initialize");

      if (
        !gameGlobals.stageDimensions.width ||
        !gameGlobals.stageDimensions.height
      ) {
        gameGlobals.setStageDimensions({
          width: dimensions.width,
          height: dimensions.height,
        });
      }

      container.appendChild(canvas);
      appRef.current = app;

      // // Disable auto-resizing
      app.renderer.resize(dimensions.width, dimensions.height);

      gameGlobals.setApp(app);
      gameGlobals.setCanvas(canvas);

      // console.log("App initialized");
    };

    createPixiApp();

    gameGlobals.stagedScenes.forEach((scene) =>
      gameGlobals.unstageScene(scene.id)
    );

    return cleanup;
  }, [gameGlobals.pixiContainer]);

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

    // console.log("Cleanup");
  };

  return (
    <div ref={containerRef} className="fixed overflow-hidden bg-black -z-10" />
  );
};

export default VideoSwitcher;
