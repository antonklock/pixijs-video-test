"use client";

import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import debugStore from "@/stores/debug/debugStore";

// TODO: Clean up this component
const HitboxManager = () => {
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
      gameGlobals.currentScene?.hitboxes.forEach((hitbox) => {
        if (
          newTime >= hitbox.activationIntervals[0].start &&
          newTime <= hitbox.activationIntervals[0].end
        ) {
          if (!hitbox.isActive) {
            handleActivateHitbox(hitbox.name);
          }
        } else {
          if (hitbox.isActive) {
            handleDeactivateHitbox(hitbox.name);
          }
        }
      });
    }
  };

  function handleActivateHitbox(hitboxName: string) {
    logStageContainers();

    const hitbox = findHitboxByName(hitboxName);
    if (hitbox) {
      hitbox.isActive = true;
      updateHitboxGraphics(hitboxName, 0x00ff00);
    }
  }

  function handleDeactivateHitbox(hitboxName: string) {
    logStageContainers();

    const hitbox = findHitboxByName(hitboxName);
    if (hitbox) {
      hitbox.isActive = false;
      updateHitboxGraphics(hitboxName, 0xee0000);
    }
  }

  function logStageContainers() {
    gameGlobals.app.stage.children.forEach((child: PIXI.Container) => {});
  }

  function findHitboxByName(hitboxName: string) {
    return gameGlobals.currentScene?.hitboxes.find(
      (hitbox) => hitbox.name === hitboxName
    );
  }

  function updateHitboxGraphics(hitboxName: string, color: number = 0xee0000) {
    const hitboxContainers = gameGlobals.app.stage.children.filter(
      (child: PIXI.Graphics) => child.label === hitboxName + "-container"
    );

    if (hitboxContainers.length > 0) {
      hitboxContainers.forEach((hitboxContainer: PIXI.Container) => {
        const hitboxGraphic = hitboxContainer.children.find(
          (child: PIXI.Graphics | PIXI.Container) => child.label === hitboxName
        );
        if (hitboxGraphic && hitboxGraphic instanceof PIXI.Graphics) {
          hitboxGraphic.tint = color;
        } else {
          console.log("Hitbox graphic not found:", hitboxName);
        }
      });
    } else {
      console.log("Hitbox container not found:", hitboxName + "-container");
    }
  }

  return (
    <>
      {showCurrentVideoTime && (
        <div>
          <p>Current video time: {currentVideoTime}</p>
        </div>
      )}
    </>
  );
};

export default HitboxManager;
