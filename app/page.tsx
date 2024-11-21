"use client";

import VideoSwitcher from "@/components/VideoSwitcher";
import { useEffect, useState } from "react";
import { GameGlobals, PendingVideo } from "@/types";

export default function Home() {
  const [pendingVideos, setPendingVideos] = useState<PendingVideo[]>([]);
  const [gameGlobals, setGameGlobals] = useState<GameGlobals>({
    isGameRunning: false,
    stagedScenes: [],
    currentScene: null,
  });

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
    console.log(gameGlobals);
  }, [gameGlobals]);

  return (
    <div className="w-full flex items-center flex-col justify-center">
      {gameGlobals.isGameRunning ? (
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
            setPendingVideos={setPendingVideos}
            pendingVideos={pendingVideos}
          />
        </div>
      ) : (
        <button
          className="absolute top-1/2 left-1/2 -translate-1/2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() =>
            setGameGlobals({ ...gameGlobals, isGameRunning: true })
          }
        >
          Start Game
        </button>
      )}
    </div>
  );
}
