"use client";

import VideoSwitcher from "@/components/VideoSwitcher";
import { useState } from "react";

const sources = [
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/51cb3c8b7aec89d2df5aa95981c2a7c0/manifest/video.m3u8",
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/36597fa6c0bf1a5820b712e1e832cf8f/manifest/video.m3u8",
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/30cbfd2e855a15fc730e5b47553dc726/manifest/video.m3u8",
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/862fd9f600910ac44835de3033d851b4/manifest/video.m3u8",
];

export default function Home() {
  const [startGame, setStartGame] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {startGame ? (
        <VideoSwitcher videoSources={sources} />
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setStartGame(true)}
        >
          Start Game
        </button>
      )}
    </div>
  );
}
