"use client";

import useDebugStore from "@/stores/debug/debugStore";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import { useRef, useState, useEffect } from "react";
import * as Tone from "tone";

const MusicPlayer = () => {
  const playerRef = useRef<Tone.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const musicUrl = useRef(
    "https://klockworks.xyz/Music/ybp-raiseyourglass.mp3"
  );

  const [transportSeconds, setTransportSeconds] = useState(0);
  const loopRef = useRef<Tone.Loop | null>(null);

  const { currentScene } = useGameGlobalsStore();
  const [currentVideo, setCurrentVideo] = useState<HTMLVideoElement | null>(
    null
  );
  const [currentVideoTime, setCurrentVideoTime] = useState(0);

  const { isGameRunning, setGameState, switchToScene } = useGameGlobalsStore();

  const currentVideoRef = useRef<HTMLVideoElement | null>(null);
  const currentSceneRef = useRef<SceneObject | null>(null);

  useEffect(() => {
    if (isGameRunning && !isPlaying && !hasLoaded) loadMusic();

    return () => {
      // playerRef.current?.stop();
      // playerRef.current?.dispose();
      // playerRef.current = null;
      setIsPlaying(false);
      setHasLoaded(false);
    };
  }, [isGameRunning]);

  useEffect(() => {
    const currentVideo =
      useGameGlobalsStore.getState().currentScene?.video.player;
    if (currentVideo) {
      setCurrentVideo(currentVideo);
      currentVideoRef.current = currentVideo;
      currentSceneRef.current = useGameGlobalsStore.getState().currentScene;
      console.log("Current video set");
    }
  }, [currentScene]);

  const loadMusic = async () => {
    if (playerRef.current) return;
    console.log("Loading music...");

    playerRef.current = new Tone.Player(musicUrl.current).toDestination();
    if (!playerRef.current) return console.error("Failed to create player");
    await playerRef.current.load(musicUrl.current);
    console.log("Music loaded");

    const gameGlobals = useGameGlobalsStore.getState();
    const setMusicPlayer = gameGlobals.setMusicPlayer;
    const loseTime = gameGlobals.loseTime;

    setMusicPlayer(playerRef.current);

    Tone.getTransport().start();
    playerRef.current?.sync();
    if (playerRef.current?.state !== "started") {
      playerRef.current?.start();
      playerRef.current?.sync();
      setIsPlaying(true);
      console.log("Playing music...");
    }
    setHasLoaded(true);

    // const loseTime = 196;
    // const loseTime = 15;

    // End game at 196 seconds
    const loop = new Tone.Loop((time) => {
      setTransportSeconds(time);
      if (currentVideoRef.current) {
        setCurrentVideoTime(currentVideoRef.current.currentTime);
        if (playerRef.current) {
          if (currentSceneRef.current?.id === "H0") {
            // syncVideoTime(currentVideoRef.current, playerRef.current, 1.75);
          }
        }
      } else {
        console.log("Current video not set");
      }

      const { gameState, currentScene } = useGameGlobalsStore.getState();

      // Fading out music when game is done
      if (time > loseTime + 5) {
        if (gameState === "playing" || gameState === "lost") {
          if (
            playerRef.current?.volume?.value ||
            playerRef.current?.volume.value === 0
          ) {
            if (playerRef.current.volume.value > -50) {
              playerRef.current.volume.value -= 5;
            }
          }
        }
      }

      // End game when time is up
      if (time > loseTime) {
        if (gameState === "playing") {
          setGameState("lost");
          switchToScene("L1");
        } else if (gameState === "won" || currentScene?.id !== "H6-B") {
          switchToScene("H6-B");
        } else {
          console.log(`Can't lose game when state is ${gameState}`);
        }
      }

      useGameGlobalsStore.getState().setGameTime(time);
    }, "16n").start();

    loopRef.current = loop;
  };

  return (
    <>
      {useDebugStore.getState().showCurrentVideoTime && (
        <div
          className="absolute top-0 left-20 text-white"
          style={{
            zIndex: "100000",
          }}
        >
          <p>Music time: {transportSeconds}</p>
          <p>Current video time: {currentVideoTime}</p>
        </div>
      )}
    </>
  );
};

const syncVideoTime = (
  video: HTMLVideoElement,
  player: Tone.Player,
  offset: number = 0
) => {
  const syncInterval = setInterval(() => {
    const videoCurrentTime = video.currentTime;
    const transportCurrentTime = player.toSeconds();

    const timeDifference = videoCurrentTime - transportCurrentTime;

    if (Math.abs(timeDifference + offset) > 0.5) {
      // Adjust playback rate to sync
      video.playbackRate = timeDifference > 0 ? 1.25 : 0.75;
      console.log("Adjusting playback rate to ", video.playbackRate);
    } else {
      // Stop adjusting when within 0.5 seconds
      clearInterval(syncInterval);
      video.playbackRate = 1; // Reset playback rate to normal
    }
  }, 100); // Check every 100ms
};

export default MusicPlayer;
