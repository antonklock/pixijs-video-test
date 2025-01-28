"use client";

import { useState } from "react";
import Game from "@/components/Game";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

export default function Home() {
  // const [gameStarted, setGameStarted] = useState(false);
  const gameGlobals = useGameGlobalsStore();

  return (
    <div className="w-full flex items-center flex-col justify-center">
      {gameGlobals.isGameRunning ? (
        <Game />
      ) : (
        <button
          className="absolute top-1/2 left-1/2 -translate-1/2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => gameGlobals.setIsGameRunning(true)}
        >
          Start Game
        </button>
      )}
    </div>
  );
}
