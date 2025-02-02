"use client";

import React, { useEffect, useState } from "react";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import * as PIXI from "pixi.js";
import Hls from "hls.js";
import { CustomVideoSource } from "@/utils/CustomVideoSource.mjs";

const VideoElementsCreator = () => {
  const gameGlobals = useGameGlobalsStore();
  const pixiAppRef = React.useRef<PIXI.Application | null>(null);
  const pixiCanvasRef = React.useRef<HTMLCanvasElement | null>(null);

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
  }, []);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (gameGlobals.videoPlayers.length > 0) return;

    const newVideoElement = document.createElement("video");
    const video = initVideo(newVideoElement); // Now correctly returns the video element
    gameGlobals.videoPlayers.push(video);
    document.body.appendChild(video);
  }, [gameGlobals]);

  const loadHLSVideo = async (url: string) => {
    console.log("loadHLSVideo", url);
    const videoPlayer = gameGlobals.videoPlayers[0];

    if (videoPlayer) {
      videoPlayer.pause();
      videoPlayer.src = "";
      videoPlayer.load();

      if (Hls.isSupported()) {
        const hls = new Hls({
          debug: false,
          enableWorker: true,
          lowLatencyMode: true,
        });

        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          console.log("HLS attached to media");
        });

        // Ensure we remove old listeners before adding new ones
        hls.off(Hls.Events.ERROR);
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.error(`HLS fatal error: ${data.type}`);
            hls.destroy();
          }
        });

        hls.attachMedia(videoPlayer);
        hls.loadSource(url);

        if (videoPlayer.readyState >= 3 && !videoPlayer.paused) {
          console.warn("Video is already playing, skipping play()");
        } else {
          await videoPlayer.play();
        }

        const videoTexture = PIXI.Texture.from(videoPlayer);
        const videoSprite = new PIXI.Sprite(videoTexture);
        videoSprite.label = "videoSprite";
        pixiAppRef.current?.stage.addChild(videoSprite);

        setLoaded(true);
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
      {gameGlobals.videoPlayers.map((video, index) => (
        <video key={video + "" + index} src={video.src} />
      ))}
    </>
  );
};

// const initVideo: (video: HTMLVideoElement) => HTMLVideoElement = (
//   video: HTMLVideoElement
// ) => {
//   video.setAttribute("playsinline", "true");
//   video.setAttribute("webkit-playsinline", "true");
//   video.muted = true;
//   video.loop = true;
//   video.crossOrigin = "anonymous";
//   video.preload = "auto";
//   //   video.style.position = "absolute";
//   //   video.style.opacity = "0";
//   //   video.style.pointerEvents = "none";
//   //   video.style.zIndex = "-1000";
//   video.setAttribute("autoplay", "true");
//   //   video.setAttribute("autoplay", "false");
//   return video;
// };

const initVideo = (video: HTMLVideoElement) => {
  video.setAttribute("playsinline", "true");
  video.setAttribute("webkit-playsinline", "true");
  video.muted = true;
  video.loop = true;
  video.crossOrigin = "anonymous";
  video.preload = "auto";
  video.setAttribute("autoplay", "true");

  const customVideo = new CustomVideoSource({ resource: video });

  return customVideo.video; // Return the video element
};

export default VideoElementsCreator;
