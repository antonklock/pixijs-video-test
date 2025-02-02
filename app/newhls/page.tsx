"use client";

import React, { useEffect, useState, useRef } from "react";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import * as PIXI from "pixi.js";
import Hls from "hls.js";
import { CustomVideoSource } from "@/utils/CustomVideoSource.mjs";

interface VideoPlayer {
  element: HTMLVideoElement;
  sprite: PIXI.Sprite | null;
  hls: Hls | null;
}

const VideoElementsCreator = () => {
  const pixiAppRef = useRef<PIXI.Application | null>(null);
  const pixiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadingRef = useRef<{ [key: number]: boolean }>({ 0: false, 1: false });
  const videoPlayersRef = useRef<{ [key: number]: VideoPlayer }>({});

  async function initPixi() {
    const app = new PIXI.Application();
    await app.init({
      width: 1280, // Reduced canvas size
      height: 720,
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
    const video1 = document.createElement("video");
    initVideo(video1);
    videoPlayersRef.current[0] = {
      element: video1,
      sprite: null,
      hls: null,
    };
    document.body.appendChild(video1);
    video1.style.width = "160px"; // Make HTML video elements small too
    video1.style.height = "90px";

    const video2 = document.createElement("video");
    initVideo(video2);
    videoPlayersRef.current[1] = {
      element: video2,
      sprite: null,
      hls: null,
    };
    document.body.appendChild(video2);
    video2.style.width = "160px";
    video2.style.height = "90px";

    return () => {
      Object.values(videoPlayersRef.current).forEach((player) => {
        if (player.hls) {
          player.hls.destroy();
        }
        if (player.sprite) {
          player.sprite.destroy(true);
        }
        player.element.remove();
      });
    };
  }, []);

  const loadHLSVideo = async (url: string, playerIndex: number) => {
    if (loadingRef.current[playerIndex]) {
      console.log(
        `Already loading video for player ${playerIndex}, please wait`
      );
      return;
    }

    loadingRef.current[playerIndex] = true;
    console.log(`loadHLSVideo for player ${playerIndex}:`, url);

    const player = videoPlayersRef.current[playerIndex];
    if (!player || !pixiAppRef.current) {
      loadingRef.current[playerIndex] = false;
      return;
    }

    try {
      if (player.sprite) {
        player.sprite.texture.destroy(true);
        player.sprite.destroy();
        pixiAppRef.current.stage.removeChild(player.sprite);
        player.sprite = null;
      }

      player.element.pause();
      player.element.srcObject = null;
      player.element.removeAttribute("src");
      player.element.load();

      if (player.hls) {
        player.hls.destroy();
        player.hls = null;
      }

      if (Hls.isSupported()) {
        const hls = new Hls({
          debug: false,
          enableWorker: true,
          lowLatencyMode: true,
        });

        const hlsLoadPromise = new Promise<void>((resolve, reject) => {
          const onError = (event: any, data: any) => {
            if (data.fatal) {
              console.error(`HLS fatal error: ${data.type}`);
              reject(new Error(`HLS fatal error: ${data.type}`));
            }
          };

          const onMediaAttached = () => {
            console.log(`HLS attached to media for player ${playerIndex}`);
            hls.off(Hls.Events.ERROR, onError);
            resolve();
          };

          hls.once(Hls.Events.MEDIA_ATTACHED, onMediaAttached);
          hls.once(Hls.Events.ERROR, onError);
        });

        hls.attachMedia(player.element);
        hls.loadSource(url);
        player.hls = hls;

        await hlsLoadPromise;

        await new Promise<void>((resolve) => {
          const checkVideo = () => {
            if (player.element.readyState >= 2) {
              resolve();
            } else {
              player.element.addEventListener("loadeddata", () => resolve(), {
                once: true,
              });
            }
          };
          checkVideo();
        });

        const videoTexture = PIXI.Texture.from(player.element);
        const videoSprite = new PIXI.Sprite(videoTexture);

        // Smaller sprites
        videoSprite.width = 1280 / 2; // Half of new canvas width
        videoSprite.height = 720 / 2;
        if (playerIndex === 1) {
          videoSprite.x =
            pixiAppRef.current.stage.width / 2 + videoSprite.width / 2; // Position second video on the right
        }

        player.sprite = videoSprite;
        pixiAppRef.current.stage.addChild(videoSprite);

        if (playerIndex === 0) {
          await new Promise<void>((resolve) => {
            player.element.addEventListener("canplay", () => resolve(), {
              once: true,
            });
          });

          await player.element.play();
        }
      }
    } catch (e) {
      console.warn(
        `Video loading/playing failed for player ${playerIndex}:`,
        e
      );
    } finally {
      loadingRef.current[playerIndex] = false;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <canvas ref={pixiCanvasRef} />
      </div>
      <div className="flex gap-4">
        <div>
          <h3 className="text-sm mb-2">Video Player 1</h3>
          <div className="flex gap-2">
            <button
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
              onClick={() =>
                loadHLSVideo(
                  "https://stream.mux.com/6TLRQJ1e2xp02lshfjpBg42DYMdCoLf3MongqkQRUmLo.m3u8",
                  0
                )
              }
            >
              Load Video 1A
            </button>
            <button
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
              onClick={() =>
                loadHLSVideo(
                  "https://stream.mux.com/AZZOFn02NIEGLvAygrAlwBelpLk9mQWvzVm02pROtyFr4.m3u8",
                  0
                )
              }
            >
              Load Video 1B
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-sm mb-2">Video Player 2</h3>
          <div className="flex gap-2">
            <button
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
              onClick={() =>
                loadHLSVideo(
                  "https://stream.mux.com/6TLRQJ1e2xp02lshfjpBg42DYMdCoLf3MongqkQRUmLo.m3u8",
                  1
                )
              }
            >
              Load Video 2A
            </button>
            <button
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
              onClick={() =>
                loadHLSVideo(
                  "https://stream.mux.com/AZZOFn02NIEGLvAygrAlwBelpLk9mQWvzVm02pROtyFr4.m3u8",
                  1
                )
              }
            >
              Load Video 2B
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const initVideo = (video: HTMLVideoElement) => {
  if ((video as any).customVideoInitialized) return video;

  video.setAttribute("playsinline", "true");
  video.setAttribute("webkit-playsinline", "true");
  video.muted = true;
  video.loop = true;
  video.crossOrigin = "anonymous";
  video.preload = "auto";
  video.setAttribute("autoplay", "true");

  const customVideo = new CustomVideoSource({ resource: video });
  (video as any).customVideoInitialized = true;

  return customVideo.video;
};

export default VideoElementsCreator;
