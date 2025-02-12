"use client";

import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const gameGlobals = useGameGlobalsStore();
  const [isFading, setIsFading] = useState(false);

  const handleStartGame = async () => {
    setIsFading(true);
    setTimeout(() => {
      gameGlobals.setIsGameRunning(true);
      setIsFading(false);
    }, 500);
  };

  const handleStopGame = () => {
    setIsFading(true);
    setTimeout(() => {
      gameGlobals.setIsGameRunning(false);
      setIsFading(false);
    }, 500);
  };

  useEffect(() => {
    console.log("isGameRunning", gameGlobals.isGameRunning);
  }, [gameGlobals.isGameRunning]);

  return (
    <div
      className={`w-full h-screen flex items-center flex-col justify-center transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src="/logos/ybp-Logo-white-256.png" // Adjust the path if the logo file has a different name or location
        alt="Game Logo"
        width={200} // Set the desired width
        height={100} // Set the desired height
        className="mb-4" // Add margin below the logo
      />
      <div className={`flex flex-col items-center justify-center`}>
        {gameGlobals.isGameRunning ? (
          // <Game />
          <div className="flex flex-col items-center justify-center">
            <p className="text-white text-2xl mb-4">
              {"Hey ho! Insert more coins!"}
            </p>
            <button
              className="px-4 py-2 bg-black border border-[#555555] text-[#DDDDDD] hover:border-[#AAAAAA] hover:text-[#EEEEEE] rounded"
              onClick={handleStopGame}
            >
              I don&apos;t have any coins
            </button>
          </div>
        ) : null}
      </div>

      {!gameGlobals.isGameRunning ? (
        <button
          className={` px-4 py-2 bg-black border border-[#555555] text-[#DDDDDD] hover:border-[#AAAAAA] hover:text-[#EEEEEE] rounded`}
          onClick={handleStartGame}
        >
          Start Game
        </button>
      ) : null}
    </div>
  );
}
