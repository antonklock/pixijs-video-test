"use client";

import Alerts from "@/components/Alerts";
import Game from "@/components/Game";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

export default function Home() {
  const gameGlobals = useGameGlobalsStore();
  const [isFading, setIsFading] = useState(false);
  const [bgColor, setBgColor] = useState("bg-[#0a0a0a]");
  const pixiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gameGlobals.setPixiContainer(pixiContainerRef.current);
  }, []);

  useEffect(() => {
    if (gameGlobals.isGameRunning) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [gameGlobals.isGameRunning]);

  const handleStartGame = async () => {
    handleStartMusic();

    setIsFading(true);
    setBgColor("bg-black");
    setTimeout(() => {
      gameGlobals.setIsGameRunning(true);
    }, 500);
  };

  async function handleStartMusic() {
    await Tone.start();
    Tone.getTransport().start();
  }

  useEffect(() => {
    console.log(gameGlobals.isGameRunning);
  }, [gameGlobals.isGameRunning]);

  return (
    <>
      {!gameGlobals.isGameRunning && (
        <>
          <div className="w-full h-auto flex items-center justify-center mt-4 gap-4">
            <p
              className="text-white hover:underline cursor-pointer"
              onClick={() =>
                window.open("https://www.yebanishedprivateers.com/")
              }
            >
              Ye Banished Privateers
            </p>
            <p
              className="text-white hover:underline cursor-pointer"
              onClick={() =>
                window.open(
                  "https://ye-banished-privateers-treasure-chest.myshopify.com/",
                  "_blank"
                )
              }
            >
              Store
            </p>
            <p
              className="text-white hover:underline cursor-pointer"
              onClick={() => window.open("/credits")}
            >
              Credits
            </p>
          </div>
        </>
      )}
      <Alerts />

      <div className="w-full h-[100vh] flex items-center justify-center overflow-hidden">
        <div
          ref={pixiContainerRef}
          className="pixi-container w-full h-full flex items-center justify-center"
        />
      </div>
      <div
        className={`w-full h-auto flex items-center flex-col justify-center ${bgColor} transition-colors duration-500`}
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
    </>
  );
}
