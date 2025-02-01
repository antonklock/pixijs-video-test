"use client";

import useWrestlingStore from "@/stores/wrestling/wrestlingStore";
import { useEffect, useState } from "react";

const GameControl = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const { strength, onClick, gameTime, handicap } = useWrestlingStore();

  const handleStart = () => {
    setGameStarted(true);
    useWrestlingStore.getState().startGame();
  };

  const handleClick = () => {
    onClick();
  };

  const getBarColor = () => {
    if (strength >= 8) return "bg-green-500";
    if (strength >= 5) return "bg-yellow-500";
    if (strength >= 3) return "bg-red-500";
    return "bg-red-500"; // Empty bar
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!gameStarted ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleStart}
        >
          Start
        </button>
      ) : (
        <>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleClick}
          >
            Click
          </button>
          <p className="text-2xl font-bold">
            Current Strength: {strength.toFixed(2)}
          </p>
          <p className="text-xl">Game Time: {gameTime.toFixed(2)} seconds</p>
          <p className="text-xl">Handicap: {handicap.toFixed(2)}</p>
        </>
      )}
      <div className="w-1/2 bg-gray-300 h-4 mt-4 border border-white">
        <div
          className={`h-full ${getBarColor()} p-1`}
          style={{ width: `${(strength / 10) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default GameControl;
