"use client";

import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect } from "react";

// TODO: Clean up this component
const SceneEventManager = () => {
  const gameGlobals = useGameGlobalsStore();
  const videoPlayerRef = gameGlobals.currentScene?.video.player;

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

      // Handle scene events
      gameGlobals.currentScene?.sceneEvents?.forEach((sceneEvent) => {
        if (
          newTime > sceneEvent.triggerTime &&
          !gameGlobals.sceneEvents.has(sceneEvent.name)
        ) {
          console.log("Scene event triggered:", sceneEvent.name);
          sceneEvent.runEvent();
          gameGlobals.sceneEvents.add(sceneEvent.name);
        }
      });
    }
  };

  return <></>;
};

export default SceneEventManager;
