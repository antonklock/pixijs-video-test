"use client";

import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useRef, useState, useEffect } from "react";
import * as Tone from "tone";

const musicUrl =
  "https://klockworks.xyz/Music/Ye%20Banished%20Privateers%20-%20Raise%20Your%20Glass.mp3";

const MusicPlayer = () => {
  const playerRef = useRef<Tone.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const { isGameRunning } = useGameGlobalsStore();

  useEffect(() => {
    console.log("isGameRunning", isGameRunning);
    if (isGameRunning && !isPlaying && !hasLoaded) loadMusic();

    return () => {
      playerRef.current?.stop();
      playerRef.current?.dispose();
      playerRef.current = null;
      setIsPlaying(false);
      setHasLoaded(false);
    };
  }, []);

  const loadMusic = async () => {
    playerRef.current = new Tone.Player(musicUrl).toDestination();
    await playerRef.current.load(musicUrl);

    playerRef.current?.sync();
    Tone.getTransport().start();
    if (playerRef.current?.state !== "started") {
      playerRef.current?.start();
      setIsPlaying(true);
    }
    setHasLoaded(true);
  };

  const togglePlayback = () => {
    if (!playerRef.current || !hasLoaded) return;

    if (isPlaying) {
      Tone.getTransport().pause();
      setIsPlaying(false);
    } else {
      Tone.getTransport().start();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <button className="absolute top-10 right-10" onClick={togglePlayback}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </>
  );
};

export default MusicPlayer;
