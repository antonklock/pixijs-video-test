"use client";

import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useRef, useState, useEffect } from "react";
import * as Tone from "tone";

const musicUrl =
  "https://pxuqfsrwodxpzpensqhu.supabase.co/storage/v1/object/public/media//Ye%20Banished%20Privateers%20-%20Raise%20Your%20Glass.mp3";

const MusicPlayer = () => {
  const playerRef = useRef<Tone.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { isGameRunning } = useGameGlobalsStore();

  useEffect(() => {
    if (isGameRunning) loadMusic();

    // Cleanup function
    return () => {
      playerRef.current?.stop();
      playerRef.current?.dispose();
    };
  }, [isGameRunning]);

  const loadMusic = async () => {
    playerRef.current = new Tone.Player(musicUrl).toDestination();
    await playerRef.current.load(musicUrl);
    playerRef.current.start();
    setIsPlaying(true);
  };

  const togglePlayback = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.stop();
      setIsPlaying(false);
    } else {
      playerRef.current.start();
      setIsPlaying(true);
    }
  };

  return (
    <button className="absolute top-10 right-10" onClick={togglePlayback}>
      {isPlaying ? "Pause" : "Play"}
    </button>
  );
};

export default MusicPlayer;
