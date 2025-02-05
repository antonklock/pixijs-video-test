"use client";

import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useState } from "react";
import debugStore from "@/stores/debug/debugStore";

// TODO: Clean up this component
const SceneEventManager = () => {
  const gameGlobals = useGameGlobalsStore();
  const videoPlayerRef = gameGlobals.currentScene?.video.player;
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const { showCurrentVideoTime } = debugStore();

  useEffect(() => {
    const currentVideoPlayer = gameGlobals.currentScene?.video.player;
    if (!currentVideoPlayer) return;

    if (videoPlayerRef.current) {
      videoPlayerRef.current.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );
    }

    if (currentVideoPlayer) {
      videoPlayerRef.current = currentVideoPlayer;
      currentVideoPlayer.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.removeEventListener(
          "timeupdate",
          handleTimeUpdate
        );
      }
    };
  }, [gameGlobals.currentScene?.video.player]);

  const handleTimeUpdate = () => {
    if (videoPlayerRef.current) {
      const newTime = videoPlayerRef.current.currentTime;
      setCurrentVideoTime(newTime);

      // Handle scene events
      gameGlobals.currentScene?.sceneEvents?.forEach((sceneEvent) => {
        if (newTime > sceneEvent.triggerTime && !sceneEvent.hasRun) {
          console.log("Scene event triggered:", sceneEvent.name);
          sceneEvent.runEvent();
          sceneEvent.hasRun = true;
        }
      });
    }
  };

  return (
    <>
      {/* {showCurrentVideoTime && (
        <div>
          <p>Current video time: {currentVideoTime}</p>
        </div>
      )} */}
    </>
  );
};

export default SceneEventManager;
