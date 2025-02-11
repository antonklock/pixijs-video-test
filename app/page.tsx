"use client";

import Game from "@/components/Game";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useState } from "react";
import * as Tone from "tone";
export default function Home() {
  const gameGlobals = useGameGlobalsStore();
  const [isFading, setIsFading] = useState(false);
  const [bgColor, setBgColor] = useState("bg-[#0a0a0a]");

  const handleStartGame = async () => {
    setIsFading(true);
    setBgColor("bg-black");
    await Tone.start();
    setTimeout(() => {
      gameGlobals.setIsGameRunning(true);
    }, 500);
  };

  useEffect(() => {
    console.log("isGameRunning", gameGlobals.isGameRunning);
  }, [gameGlobals.isGameRunning]);

  return (
    <div
      className={`w-full h-full flex items-center flex-col justify-center ${bgColor} transition-colors duration-500`}
    >
      {gameGlobals.isGameRunning ? (
        // <Game />
        <>
          <p>{"You're playing the game!"}</p>
        </>
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
