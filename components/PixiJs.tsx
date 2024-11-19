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
  const [dimensions, setDimensions] = useState(() => {
    // Initialize with window dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const targetRatio = 16 / 9;
    let width = viewportWidth;
    let height = Math.floor(width / targetRatio);

    if (height > viewportHeight) {
      height = viewportHeight;
      width = Math.floor(height * targetRatio);
    }

    return { width, height };
  });

  const calculateDimensions = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const targetRatio = 16 / 9;
    let width = viewportWidth;
    let height = Math.floor(width / targetRatio);

    if (height > viewportHeight) {
      height = viewportHeight;
      width = Math.floor(height * targetRatio);
    }

    return { width, height };
  };

  const resizeHandler = () => {
    const newDimensions = calculateDimensions();
    setDimensions(newDimensions);

    if (appRef.current) {
      appRef.current.renderer.resize(newDimensions.width, newDimensions.height);
      appRef.current.stage.position.set(
        newDimensions.width / 2,
        newDimensions.height / 2
      );

      videoSpritesRef.current.forEach((sprite) => {
        if (sprite) {
          sprite.width = newDimensions.width;
          sprite.height = newDimensions.height;
          sprite.position.set(0, 0); // Center relative to stage
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
      if (sprite.texture) {
        sprite.texture.destroy(true);
      }
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
      await new Promise<void>((resolve) => {
        const checkVideo = () => {
          if (video.readyState >= 2) {
            resolve();
          } else {
            video.addEventListener("loadeddata", () => resolve(), {
              once: true,
            });
          }
        };
        checkVideo();
      });

      const videoTexture = PIXI.Texture.from(video);
      const videoSprite = new PIXI.Sprite(videoTexture);

      videoSprite.anchor.set(0.5);
      videoSprite.width = dimensions.width;
      videoSprite.height = dimensions.height;
      videoSprite.position.set(0, 0); // Center relative to stage
      videoSprite.visible = index === 0;

      videoSprites[index] = videoSprite;
      videoSpritesRef.current[index] = videoSprite;

      if (app?.stage) {
        app.stage.addChild(videoSprite);
      }
    } catch (error) {
      console.error("Error creating video sprite:", error);
      setErrors((prev) => [...prev, `Sprite error ${index}: ${error.message}`]);
    }
  };

  useEffect(() => {
    let mounted = true;
    const videos: HTMLVideoElement[] = [];
    const hlsInstances: Hls[] = [];
    const videoSprites: PIXI.Sprite[] = [];

    const setupHls = async (source: string, index: number) => {
      return new Promise<void>((resolve, reject) => {
        const video = document.createElement("video");
        video.crossOrigin = "anonymous";
        video.muted = true;
        video.preload = "auto";
        video.playsInline = true;
        video.autoplay = false;

        videos[index] = video;
        videosRef.current[index] = video;

        if (Hls.isSupported()) {
          const hls = new Hls({
            debug: false,
            enableWorker: true,
            lowLatencyMode: true,
            fragLoadPolicy: {
              default: {
                maxTimeToFirstByteMs: 20000,
                maxLoadTimeMs: 20000,
                timeoutRetry: {
                  maxNumRetry: 3,
                  retryDelayMs: 0,
                  maxRetryDelayMs: 0,
                },
                errorRetry: {
                  maxNumRetry: 3,
                  retryDelayMs: 1000,
                  maxRetryDelayMs: 8000,
                },
              },
            },
          });

          let mediaAttached = false;
          let manifestParsed = false;

          const checkReady = () => {
            if (mediaAttached && manifestParsed) {
              resolve();
            }
          };

          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            mediaAttached = true;
            checkReady();
          });

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            manifestParsed = true;
            checkReady();
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              console.error(`Fatal error playing ${source}:`, data);
              setErrors((prev) => [
                ...prev,
                `HLS fatal error ${index}: ${data.type}`,
              ]);
              reject(data);
            }
          });

          video.onerror = (e) => {
            console.error(`Video error for source ${index}:`, video.error);
            setErrors((prev) => [
              ...prev,
              `Video ${index} error: ${video.error?.message}`,
            ]);
            reject(video.error);
          };

          hls.attachMedia(video);
          hls.loadSource(source);

          hlsInstances[index] = hls;
          hlsInstancesRef.current[index] = hls;
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = source;
          video.addEventListener("loadedmetadata", () => {
            resolve();
          });
          video.addEventListener("error", (e) => {
            reject(video.error);
          });
        }
      });
    };

    const initializePixi = async () => {
      if (!canvasRef.current) return;

      const app = new PIXI.Application();
      await app.init({
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: "#000000",
        antialias: true,
        resolution: window.devicePixelRatio || 1,
      });

      if (!mounted) {
        app.destroy(true, { children: true, texture: true });
        return;
      }

      canvasRef.current.appendChild(app.canvas as HTMLCanvasElement);
      app.stage.position.set(dimensions.width / 2, dimensions.height / 2);
      appRef.current = app;

      try {
        await Promise.all(
          videoSources.map((source, index) => setupHls(source, index))
        );

        await Promise.all(
          videos.map((video, index) =>
            createVideoSprite(video, index, app, videoSprites)
          )
        );

        if (videos[0]) {
          await videos[0].play();
        }
      } catch (error) {
        console.error("Error initializing videos:", error);
        setErrors((prev) => [...prev, `Init error: ${error.message}`]);
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
            hlsInstancesRef.current[index].stopLoad();
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
        setErrors((prev) => [...prev, `Switch error: ${error.message}`]);

        if (nextHls) {
          nextHls.recoverMediaError();
        }
      }
    } catch (error) {
      console.error("Error in switchVideo:", error);
      setErrors((prev) => [...prev, `Fatal switch error: ${error.message}`]);
    }
  };

  useEffect(() => {
    const app = appRef.current;
    if (!app) return;

    const ticker = () => {
      const currentSprite = videoSpritesRef.current[currentIndex];
      if (
        currentSprite?.texture &&
        videosRef.current[currentIndex]?.readyState >= 2
      ) {
        if (!videosRef.current[currentIndex].paused) {
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
      className="fixed inset-0 w-full h-full overflow-hidden bg-black"
    >
      <div ref={canvasRef} className="w-full h-full" />
      <button
        onClick={switchVideo}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded z-10"
      >
        Switch Stream
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
