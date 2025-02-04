"use client";

import Game from "@/components/Game";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useState } from "react";

export default function Home() {
  const gameGlobals = useGameGlobalsStore();
  const [isFading, setIsFading] = useState(false);
  const [bgColor, setBgColor] = useState("bg-[#0a0a0a]");

  const handleStartGame = () => {
    setIsFading(true);
    setBgColor("bg-black");
    setTimeout(() => {
      gameGlobals.setIsGameRunning(true);
    }, 500);
  };

  return (
    <div
      className={`w-full h-full flex items-center flex-col justify-center ${bgColor} transition-colors duration-500`}
    >
      {gameGlobals.isGameRunning ? (
        <Game />
      ) : (
        <button
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-black border border-[#555555] text-[#DDDDDD] hover:border-[#AAAAAA] hover:text-[#EEEEEE] rounded transition-opacity duration-500 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleStartGame}
        >
          Start Game
        </button>
      )}
    </div>
  );
}
