import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import Hls from "hls.js";

interface VideoSwitcherProps {
  videoSources: string[];
}

const VideoSwitcher = ({ videoSources }: VideoSwitcherProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application>();
  const videosRef = useRef<HTMLVideoElement[] | null[]>([]);
  const hlsInstancesRef = useRef<Hls[] | null[]>([]);
  const videoSpritesRef = useRef<PIXI.Sprite[] | null[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const calculateDimensions = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const targetRatio = 16 / 9;

    let width = viewportWidth;
    let height = width / targetRatio;

    if (height > viewportHeight) {
      height = viewportHeight;
      width = height * targetRatio;
    }

    return {
      width: Math.floor(width),
      height: Math.floor(height),
      scale: Math.min(viewportWidth / width, viewportHeight / height),
    };
  };

  const [dimensions, setDimensions] = useState(calculateDimensions);

  const resizeHandler = () => {
    const newDimensions = calculateDimensions();
    setDimensions(newDimensions);

    if (appRef.current) {
      appRef.current.renderer.resize(newDimensions.width, newDimensions.height);
      videoSpritesRef.current.forEach((sprite) => {
        if (sprite) {
          sprite.width = newDimensions.width;
          sprite.height = newDimensions.height;
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const cleanupVideo = (index: number) => {
    const video = videosRef.current[index];
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.remove();
    }

    const hls = hlsInstancesRef.current[index];
    if (hls) {
      hls.stopLoad();
      hls.detachMedia();
      hls.destroy();
    }

    const sprite = videoSpritesRef.current[index];
    if (sprite) {
      sprite.texture?.destroy(true);
      sprite.destroy({ children: true, texture: true });
    }

    videosRef.current[index] = null;
    hlsInstancesRef.current[index] = null;
    videoSpritesRef.current[index] = null;
  };

  const createVideoSprite = async (
    video: HTMLVideoElement,
    index: number,
    app: PIXI.Application | undefined,
    videoSprites: PIXI.Sprite[]
  ) => {
    try {
      console.log(`Starting sprite creation for video ${index}`);

      await new Promise<void>((resolve) => {
        const checkVideo = () => {
          if (video.readyState >= 2) {
            console.log(`Video ${index} ready state achieved`);
            resolve();
          } else {
            video.addEventListener(
              "canplay",
              () => {
                console.log(`Video ${index} can play event`);
                resolve();
              },
              { once: true }
            );
          }
        };
        checkVideo();
      });

      console.log(`Creating video source for ${index}`);
      const videoSource = new PIXI.VideoSource({
        resource: video,
        autoPlay: true,
        updateFPS: 30,
      });

      console.log(`Creating texture for ${index}`);
      const texture = new PIXI.Texture({
        source: videoSource,
      });

      console.log(`Creating sprite for ${index}`);
      const videoSprite = new PIXI.Sprite(texture);

      const videoAspect = video.videoWidth / video.videoHeight;
      const stageAspect = dimensions.width / dimensions.height;

      let spriteWidth, spriteHeight;

      if (videoAspect > stageAspect) {
        spriteWidth = dimensions.width;
        spriteHeight = dimensions.width / videoAspect;
      } else {
        spriteHeight = dimensions.height;
        spriteWidth = dimensions.height * videoAspect;
      }

      console.log(`Setting dimensions for sprite ${index}`, {
        videoAspect,
        stageAspect,
        spriteWidth,
        spriteHeight,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        stageWidth: dimensions.width,
        stageHeight: dimensions.height,
      });

      videoSprite.width = spriteWidth;
      videoSprite.height = spriteHeight;
      videoSprite.anchor.set(0.5);
      videoSprite.position.set(dimensions.width / 2, dimensions.height / 2);
      videoSprite.visible = index === currentIndex;

      videoSprites[index] = videoSprite;
      videoSpritesRef.current[index] = videoSprite;

      if (app?.stage) {
        app.stage.addChild(videoSprite);
        console.log(`Added sprite ${index} to stage`);
      }

      // Start texture updates
      const updateTexture = () => {
        if (videoSprite && !videoSprite.destroyed) {
          videoSource.update();
          requestAnimationFrame(updateTexture);
        }
      };
      requestAnimationFrame(updateTexture);

      return videoSprite;
    } catch (error) {
      console.error(`Error creating video sprite ${index}:`, error);
      setErrors((prev) => [
        ...prev,
        `Sprite error ${index}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      ]);
    }
  };

  const initVideo = (video: HTMLVideoElement) => {
    console.log("Initializing video element");
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x-webkit-airplay", "allow");
    video.playsInline = true;
    video.muted = true;
    video.autoplay = false;
    video.preload = "auto";
    video.crossOrigin = "anonymous";
    video.style.position = "fixed";
    video.style.left = "-9999px";
    document.body.appendChild(video);

    return video;
  };

  const setupHls = async (source: string, index: number) => {
    return new Promise<HTMLVideoElement>((resolve, reject) => {
      console.log(`Setting up HLS for source ${index}`);
      const video = initVideo(document.createElement("video"));
      const videos: HTMLVideoElement[] = [];
      videos[index] = video;
      videosRef.current[index] = video;

      if (Hls.isSupported()) {
        console.log("HLS is supported");
        const hls = new Hls({
          debug: true,
          enableWorker: true,
          lowLatencyMode: true,
        });

        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          console.log(`HLS media attached for video ${index}`);
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log(`HLS manifest parsed for video ${index}`);
          resolve(video); // Resolve when manifest is parsed
        });

        hls.on(Hls.Events.LEVEL_LOADED, () => {
          console.log(`HLS level loaded for video ${index}`);
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            reject(data);
            setErrors((prev) => [
              ...prev,
              `HLS fatal error ${index}: ${data.type}`,
            ]);
          }
        });

        hls.attachMedia(video);
        hls.loadSource(source);
        const hlsInstances: Hls[] = [];
        hlsInstances[index] = hls;
        hlsInstancesRef.current[index] = hls;
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = source;
        video.addEventListener("loadedmetadata", () => {
          resolve(video);
        });
        video.addEventListener("error", (e) => {
          reject(video.error);
        });
      }
    });
  };

  useEffect(() => {
    let mounted = true;
    const videos: HTMLVideoElement[] = [];
    const hlsInstances: Hls[] = [];
    const videoSprites: PIXI.Sprite[] = [];

    const initializePixi = async () => {
      if (!canvasRef.current) return;

      const app = new PIXI.Application();
      await app.init({
        background: "#333333",
        width: dimensions.width,
        height: dimensions.height,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });

      const canvas = app.canvas;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.objectFit = "contain";

      // Debug visuals
      const debugRect = new PIXI.Graphics()
        .setStrokeStyle({ width: 2, color: 0xff0000 })
        .rect(0, 0, dimensions.width, dimensions.height)
        .stroke();
      app.stage.addChild(debugRect);

      const centerPoint = new PIXI.Graphics()
        .fill({ color: 0x00ff00 })
        .circle(dimensions.width / 2, dimensions.height / 2, 5)
        .fill();
      app.stage.addChild(centerPoint);

      canvasRef.current.appendChild(canvas);
      appRef.current = app;

      try {
        // Wait for all videos to be ready
        const videos = await Promise.all(
          videoSources.map((source, index) => setupHls(source, index))
        );

        console.log("All videos ready, creating sprites");

        // Create sprites one by one
        for (let i = 0; i < videos.length; i++) {
          const video = videos[i];
          console.log(`Creating sprite for video ${i}`);
          await createVideoSprite(video, i, app, []);
        }

        // Try to play the first video
        if (videosRef.current[0]) {
          try {
            console.log("Attempting to play first video");
            await videosRef.current[0].play();
            setIsPlaying(true);
          } catch (error) {
            console.error("Error playing first video:", error);
          }
        }
      } catch (error) {
        console.error("Error in initialization:", error);
        setErrors((prev) => [
          ...prev,
          `Init error: ${
            error instanceof Error ? error.message : String(error)
          }`,
        ]);
      }
    };

    initializePixi().catch((error) => {
      console.error("Error initializing Pixi:", error);
      setErrors((prev) => [...prev, `Init error: ${error.message}`]);
    });

    return () => {
      mounted = false;

      videos.forEach((_, index) => {
        cleanupVideo(index);
      });

      if (appRef.current) {
        appRef.current.destroy(true, {
          children: true,
          texture: true,
        });
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
  }, [videoSources, dimensions.width, dimensions.height]);

  const switchVideo = async () => {
    try {
      const currentVideo = videosRef.current[currentIndex];
      const currentSprite = videoSpritesRef.current[currentIndex];
      const currentHls = hlsInstancesRef.current[currentIndex];

      const nextIndex = (currentIndex + 1) % videoSources.length;
      const nextVideo = videosRef.current[nextIndex];
      const nextSprite = videoSpritesRef.current[nextIndex];
      const nextHls = hlsInstancesRef.current[nextIndex];

      if (currentHls) {
        currentHls.stopLoad();
      }
      if (currentVideo) {
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }
      if (currentSprite) {
        currentSprite.visible = false;
      }

      videosRef.current.forEach((video, index) => {
        if (index !== nextIndex && video) {
          video.pause();
          video.currentTime = 0;
          if (hlsInstancesRef.current[index]) {
            hlsInstancesRef.current[index]?.stopLoad();
          }
        }
      });

      if (nextHls) {
        nextHls.startLoad();
      }

      try {
        if (nextSprite) {
          nextSprite.visible = true;
        }
        if (nextVideo) {
          await nextVideo.play();
        }

        setCurrentIndex(nextIndex);
      } catch (error) {
        console.error("Error during video switch:", error);
        setErrors((prev) => [
          ...prev,
          `Switch error: ${
            error instanceof Error ? error.message : String(error)
          }`,
        ]);

        if (nextHls) {
          nextHls.recoverMediaError();
        }
      }
    } catch (error) {
      console.error("Error in switchVideo:", error);
      setErrors((prev) => [
        ...prev,
        `Fatal switch error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      ]);
    }
  };

  useEffect(() => {
    const app = appRef.current;
    if (!app) return;

    const ticker = () => {
      const currentSprite = videoSpritesRef.current[currentIndex];

      if (!currentSprite) return;
      if (!videosRef.current[currentIndex]) return;

      if (
        currentSprite?.texture &&
        videosRef.current[currentIndex]?.readyState >= 2
      ) {
        if (!videosRef.current[currentIndex]?.paused) {
          currentSprite.texture.update();
        }
      }
    };

    app.ticker.add(ticker);
    return () => {
      app.ticker.remove(ticker);
    };
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center"
    >
      <div
        ref={canvasRef}
        className="w-full h-full flex items-center justify-center"
        style={{
          aspectRatio: "16/9",
          maxHeight: "100vh",
          maxWidth: "100vw",
        }}
      />
      <button
        onClick={async () => {
          if (!isPlaying) {
            const video = videosRef.current[currentIndex];
            if (video) {
              try {
                // Create user interaction context
                video.muted = true;
                await video.play();
                setIsPlaying(true);

                // After successful play, unmute if desired
                video.muted = false;
              } catch (error) {
                console.error("Play error:", error);
                setErrors((prev) => [
                  ...prev,
                  `Play error: ${
                    error instanceof Error ? error.message : String(error)
                  }`,
                ]);
              }
            }
          } else {
            switchVideo();
          }
        }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded z-10"
      >
        {isPlaying ? "Switch Stream" : "Play"}
      </button>
      {errors.length > 0 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 mt-4 p-4 bg-red-100 text-red-700 rounded z-10">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoSwitcher;
