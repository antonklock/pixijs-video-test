"use client";

import Game from "@/components/Game";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

export default function Home() {
  const gameGlobals = useGameGlobalsStore();

  return (
    <div className="flex items-center flex-col justify-center overflow-hidden overflow-y-hidden">
      {gameGlobals.isGameRunning ? (
        <Game />
      ) : (
        <button
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-black border border-[#555555] text-[#DDDDDD] hover:border-[#AAAAAA] hover:text-[#EEEEEE] rounded"
          onClick={() => gameGlobals.setIsGameRunning(true)}
        >
          Start Game
        </button>
      )}
    </div>
  );
}
