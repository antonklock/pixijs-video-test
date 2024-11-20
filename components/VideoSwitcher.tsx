import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { VideoSwitcherProps } from "../types";
import { useHLSPlayer } from "../hooks/useHLSPlayer";
import { usePixiStage } from "../hooks/usePixiStage";

const VideoSwitcher = (props: VideoSwitcherProps) => {
  const { videoSources, setPendingVideos } = props;
  const [errors, setErrors] = useState<string[]>([]);
  const initializationRef = useRef(false);

  const addError = (error: string) => {
    setErrors((prev) => [...prev, error]);
  };

  const {
    videosRef,
    hlsInstancesRef,
    currentIndex,
    setCurrentIndex,
    isPlaying,
    setIsPlaying,
    setupHls,
    cleanupVideo,
  } = useHLSPlayer({ onError: addError });

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
          setIsPlaying(true);
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
    if (initializationRef.current) return;
    initializationRef.current = true;

    const initializePixi = async () => {
      if (!canvasRef.current || appRef.current) return;

      const app = new PIXI.Application();
      await app.init({
        background: new PIXI.Color({ r: 255, g: 0, b: 0, a: 0.5 }).toArray(),
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
        const videos = await Promise.all(
          videoSources.map((source, index) => setupHls(source, index))
        );

        for (let i = 0; i < videos.length; i++) {
          const video = videos[i];
          await createVideoSprite(video, i, app, currentIndex);
        }

        if (videosRef.current[0]) {
          await videosRef.current[0].play();
          setIsPlaying(true);
        }

        const pendingVideos = videosRef.current.map((video, index) => ({
          source: videoSources[index],
          index,
          isLoaded: false,
          video,
        }));

        setPendingVideos(pendingVideos);
      } catch (error) {
        console.error("Error in initialization:", error);
        addError(
          `Init error: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    };

    initializePixi();

    return () => {
      videoSources.forEach((_, index) => {
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

  const listVideosInPixiJs = () => {
    console.log(videoSpritesRef.current);
  };

  const listHlsInstances = () => {
    console.log(hlsInstancesRef.current);
  };

  const listVideos = () => {
    console.log(videosRef.current);
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
      {/* <div className="absolute top-4 left-4 flex gap-2">
        <button
          className="w-32 h-12 bg-blue-500 text-white rounded-lg p-2 text-sm"
          onClick={listVideosInPixiJs}
        >
          Pixi sprites
        </button>
        <button
          className="w-32 h-12 bg-blue-500 text-white rounded-lg p-2 text-sm"
          onClick={listHlsInstances}
        >
          hls instances
        </button>
        <button
          className="w-32 h-12 bg-blue-500 text-white rounded-lg p-2 text-sm"
          onClick={listVideos}
        >
          Video elements
        </button>
      </div> */}

      <button
        onClick={async () => {
          if (!isPlaying) {
            const video = videosRef.current[currentIndex];
            if (video) {
              try {
                await video.play();
                setIsPlaying(true);
              } catch (error) {
                console.error("Play error:", error);
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
            <div key={`${error}-${index}`}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoSwitcher;
