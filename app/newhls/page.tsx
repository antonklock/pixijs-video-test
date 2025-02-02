"use client";

import React, { useEffect, useState, useRef } from "react";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import * as PIXI from "pixi.js";
import Hls from "hls.js";
import { CustomVideoSource } from "@/utils/CustomVideoSource.mjs";

const videoHlsMap = new WeakMap<HTMLVideoElement, Hls>();

const VideoElementsCreator = () => {
  const gameGlobals = useGameGlobalsStore();
  const pixiAppRef = useRef<PIXI.Application | null>(null);
  const pixiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentSpriteRef = useRef<PIXI.Sprite | null>(null);

  async function initPixi() {
    const app = new PIXI.Application();
    await app.init({
      width: 800,
      height: 600,
      backgroundColor: 0x330000,
    });
    pixiAppRef.current = app;
    document.body.appendChild(app.canvas);
  }

  useEffect(() => {
    initPixi();
    return () => {
      pixiAppRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (gameGlobals.videoPlayers.length > 0) return;

    const newVideoElement = document.createElement("video");
    const video = initVideo(newVideoElement);
    gameGlobals.videoPlayers.push(video);
    document.body.appendChild(video);

    return () => {
      const videoPlayer = gameGlobals.videoPlayers[0];
      if (videoPlayer) {
        const hls = videoHlsMap.get(videoPlayer);
        if (hls) {
          hls.destroy();
          videoHlsMap.delete(videoPlayer);
        }
        videoPlayer.remove();
      }
    };
  }, [gameGlobals]);

  const loadHLSVideo = async (url: string) => {
    console.log("loadHLSVideo", url);
    const videoPlayer = gameGlobals.videoPlayers[0];

    if (!videoPlayer || !pixiAppRef.current) return;

    // Clean up previous sprite and texture!
    if (currentSpriteRef.current) {
      currentSpriteRef.current.texture.destroy(true);
      currentSpriteRef.current.destroy();
      pixiAppRef.current.stage.removeChild(currentSpriteRef.current);
      currentSpriteRef.current = null;
    }

    // Reset video element
    videoPlayer.pause();
    videoPlayer.removeAttribute("src");
    videoPlayer.load();

    // Clean up previous HLS instance
    const existingHls = videoHlsMap.get(videoPlayer);
    if (existingHls) {
      existingHls.destroy();
      videoHlsMap.delete(videoPlayer);
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        debug: false,
        enableWorker: true,
        lowLatencyMode: true,
      });

      // Set up HLS
      const hlsLoadPromise = new Promise<void>((resolve, reject) => {
        hls.once(Hls.Events.MEDIA_ATTACHED, () => {
          console.log("HLS attached to media");
          resolve();
        });

        hls.once(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.error(`HLS fatal error: ${data.type}`);
            reject(new Error(`HLS fatal error: ${data.type}`));
          }
        });
      });

      hls.attachMedia(videoPlayer);
      hls.loadSource(url);
      videoHlsMap.set(videoPlayer, hls);

      // Wait for HLS to be ready
      await hlsLoadPromise;

      // Create new sprite after a short delay to ensure video is ready
      await new Promise((resolve) => setTimeout(resolve, 100));

      const videoTexture = PIXI.Texture.from(videoPlayer);
      const videoSprite = new PIXI.Sprite(videoTexture);
      videoSprite.width = 800;
      videoSprite.height = 600;
      currentSpriteRef.current = videoSprite;
      pixiAppRef.current.stage.addChild(videoSprite);

      try {
        await videoPlayer.play();
      } catch (e) {
        console.warn("Play failed:", e);
      }
    }
  };

  return (
    <>
      <div>
        <canvas ref={pixiCanvasRef} />
      </div>
      <button
        onClick={() =>
          loadHLSVideo(
            "https://stream.mux.com/6TLRQJ1e2xp02lshfjpBg42DYMdCoLf3MongqkQRUmLo.m3u8"
          )
        }
      >
        Load Video 1
      </button>
      <button
        onClick={() =>
          loadHLSVideo(
            "https://stream.mux.com/AZZOFn02NIEGLvAygrAlwBelpLk9mQWvzVm02pROtyFr4.m3u8"
          )
        }
      >
        Load Video 2
      </button>
    </>
  );
};

const initVideo = (video: HTMLVideoElement) => {
  video.setAttribute("playsinline", "true");
  video.setAttribute("webkit-playsinline", "true");
  video.muted = true;
  video.loop = true;
  video.crossOrigin = "anonymous";
  video.preload = "auto";
  video.setAttribute("autoplay", "true");

  const customVideo = new CustomVideoSource({ resource: video });

  return customVideo.video;
};

export default VideoElementsCreator;
