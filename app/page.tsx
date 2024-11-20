"use client";

import VideoSwitcher from "@/components/VideoSwitcher";
import { useEffect, useState } from "react";
import { PendingVideo } from "@/types";
// import { sceneObjects } from "@/config/sceneConfig";

const sources: string[] = [
  // "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/f63d15e200eb568dfef34b3b6696a761/manifest/video.m3u8",
  // "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/e0853c614b8e69d59b81f4e4a586c200/manifest/video.m3u8",
  // "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/30cbfd2e855a15fc730e5b47553dc726/manifest/video.m3u8",
  // "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/862fd9f600910ac44835de3033d851b4/manifest/video.m3u8",
];

export default function Home() {
  const [startGame, setStartGame] = useState(false);
  const [pendingVideos, setPendingVideos] = useState<PendingVideo[]>([]);

  const handleClearPendingVideo = (id: string) => {
    pendingVideos.forEach((video) => {
      if (video.id === id) {
        video.clear();
      }
    });

    const newPendingVideos = pendingVideos.filter((video) => video.id !== id);
    setPendingVideos(newPendingVideos);
  };

  useEffect(() => {
    console.log("pendingVideos", pendingVideos);
  }, [pendingVideos]);

  return (
    <div className="w-full flex items-center flex-col justify-center">
      {startGame ? (
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="absolute h-10 w-full top-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
            {pendingVideos.map((video) => (
              <button
                className={`w-12 h-12 z-50 text-white flex items-center justify-center rounded-full ${
                  video.isLoaded ? "bg-green-500" : "bg-red-500"
                }`}
                key={video.id}
                id={`indicator-${video.id}`}
                onClick={() => handleClearPendingVideo(video.id)}
              >
                {video.id}
              </button>
            ))}
          </div>
          <VideoSwitcher
            videoSources={sources}
            setPendingVideos={setPendingVideos}
            pendingVideos={pendingVideos}
          />
        </div>
      ) : (
        <button
          className="absolute top-1/2 left-1/2 -translate-1/2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setStartGame(true)}
        >
          Start Game
        </button>
      )}
    </div>
  );
}
