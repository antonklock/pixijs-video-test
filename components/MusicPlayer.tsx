"use client";

import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useRef, useState, useEffect } from "react";
import * as Tone from "tone";

const MusicPlayer = () => {
  const playerRef = useRef<Tone.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const musicUrl = useRef(
    "https://klockworks.xyz/music/ybp-raiseyourglass.mp3"
  );

  const [transportSeconds, setTransportSeconds] = useState(0);
  const loopRef = useRef<Tone.Loop | null>(null);

  const { isGameRunning, setGameState, switchToScene } = useGameGlobalsStore();

  useEffect(() => {
    if (isGameRunning && !isPlaying && !hasLoaded) loadMusic();

    return () => {
      playerRef.current?.stop();
      playerRef.current?.dispose();
      playerRef.current = null;
      setIsPlaying(false);
      setHasLoaded(false);
    };
  }, [isGameRunning]);

  const loadMusic = async () => {
    console.log("Loading music...");

    playerRef.current = new Tone.Player(musicUrl.current).toDestination();
    await playerRef.current.load(musicUrl.current);

    playerRef.current?.sync();
    Tone.getTransport().start();
    if (playerRef.current?.state !== "started") {
      playerRef.current?.start();
      playerRef.current?.sync();
      setIsPlaying(true);
      console.log("Playing music...");
    }
    setHasLoaded(true);

    if (loopRef.current) {
      loopRef.current.stop();
      loopRef.current.dispose();
    }

    const loseTime = 196;

    // End game at 196 seconds
    const loop = new Tone.Loop((time) => {
      setTransportSeconds(Tone.getTransport().seconds);
      const gameState = useGameGlobalsStore.getState().gameState;
      if (Tone.getTransport().seconds > loseTime) {
        if (gameState === "playing") {
          setGameState("lost");
          switchToScene("L1");
        } else if (gameState === "won") {
          switchToScene("A6-B");
        } else {
          console.log(`Can't lose game when state is ${gameState}`);
        }
      }
    }, "4n").start();

    loopRef.current = loop;
  };

  return null;
};

export default MusicPlayer;
