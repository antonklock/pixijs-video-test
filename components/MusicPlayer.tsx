"use client";

import { useRef, useState } from "react";

const musicUrl =
  "https://pxuqfsrwodxpzpensqhu.supabase.co/storage/v1/object/public/media//Ye%20Banished%20Privateers%20-%20Raise%20Your%20Glass.mp3";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <>
      <button
        className="absolute top-10 right-10"
        onClick={() => {
          if (audioRef.current?.paused) {
            audioRef.current?.play();
            setIsPlaying(true);
          } else {
            audioRef.current?.pause();
            setIsPlaying(false);
          }
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <audio ref={audioRef} src={musicUrl} autoPlay />
    </>
  );
}
