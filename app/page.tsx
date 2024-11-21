"use client";

import { useState } from "react";
import Game from "@/components/Game";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="w-full flex items-center flex-col justify-center">
      {gameStarted ? (
        <Game />
      ) : (
        <button
          className="absolute top-1/2 left-1/2 -translate-1/2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setGameStarted(true)}
        >
          Start Game
        </button>
      )}
    </div>
  );
}
