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
          if (
            !hitbox.isActive ||
            getHitboxColor(hitbox.name) !== 0x00ff00 ||
            getHitboxCursor(hitbox.name) !== "hover"
          ) {
            console.log("Activating hitbox:", hitbox.name);
            handleActivateHitbox(hitbox.name);
          } else {
            console.log("Hitbox active:", hitbox.isActive);
          }
        } else {
          if (
            hitbox.isActive &&
            getHitboxColor(hitbox.name) === 0x00ff00 &&
            getHitboxCursor(hitbox.name) === "hover"
          ) {
            console.log("Deactivating hitbox:", hitbox.name);
            handleDeactivateHitbox(hitbox.name);
          } else {
            console.log("Hitbox inactive:", hitbox.isActive);
          }
        }
      });
    } else {
      console.log("No video player found!");
    }
  };

  function handleActivateHitbox(hitboxName: string) {
    const hitbox = findHitboxByName(hitboxName);
    if (hitbox) {
      hitbox.isActive = true;
      updateHitboxGraphics(hitboxName, 0x00ff00);
      updateHitboxCursor(hitboxName, "hover");
    }
  }

  function handleDeactivateHitbox(hitboxName: string) {
    const hitbox = findHitboxByName(hitboxName);
    if (hitbox) {
      hitbox.isActive = false;
      updateHitboxGraphics(hitboxName, 0xee0000);
      updateHitboxCursor(hitboxName, "default");
    }
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

  function updateHitboxCursor(hitboxName: string, state: "hover" | "default") {
    const hitboxContainers = gameGlobals.app.stage.children.filter(
      (child: PIXI.Graphics) => child.label === hitboxName + "-container"
    );

    if (hitboxContainers.length > 0) {
      hitboxContainers.forEach((hitboxContainer: PIXI.Container) => {
        const hitboxGraphic = hitboxContainer.children.find(
          (child: PIXI.Graphics | PIXI.Container) => child.label === hitboxName
        );
        if (hitboxGraphic && hitboxGraphic instanceof PIXI.Graphics) {
          hitboxGraphic.cursor = state;
        } else {
          console.log("Hitbox graphic not found:", hitboxName);
        }
      });
    } else {
      console.log("Hitbox container not found:", hitboxName + "-container");
    }
  }

  function getHitboxColor(hitboxName: string) {
    const hitbox = findHitboxByName(hitboxName);
    if (hitbox) {
      return hitbox.color;
    }
    return null;
  }

  function getHitboxCursor(hitboxName: string) {
    const hitbox = findHitboxByName(hitboxName);
    if (hitbox) {
      return hitbox.cursor;
    }
    return null;
  }

  return (
    <>
      {showCurrentVideoTime && (
        <div
          className="fixed bottom-0 left-0 p-4 bg-black text-white"
          style={{ zIndex: 1000 }}
        >
          <p>Current video time: {currentVideoTime}</p>
        </div>
      )}
    </>
  );
};

export default HitboxManager;
