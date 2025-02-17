"use client";

import Alerts from "@/components/Alerts";
import Game from "@/components/Game";
import PlayThumbButton from "@/components/PlayThumbImg";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

export default function Home() {
  const gameGlobals = useGameGlobalsStore();
  const [isFading, setIsFading] = useState(false);
  const [bgColor, setBgColor] = useState("bg-[#0a0a0a]");
  const pixiContainerRef = useRef<HTMLDivElement>(null);
  const [gameReady, setGameReady] = useState(false);

  useEffect(() => {
    gameGlobals.setPixiContainer(pixiContainerRef.current);
  }, []);

  useEffect(() => {
    if (pixiContainerRef.current && !gameReady) {
      setGameReady(true);
    }
  }, [pixiContainerRef.current]);

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
    console.log("isGameRunning: ", gameGlobals.isGameRunning);
  }, [gameGlobals.isGameRunning]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "e") {
        gameGlobals.addCoinsAndCheckWin(3);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameGlobals]);

  return (
    <>
      {!gameGlobals.isGameRunning && (
        <div
          className="absolute top-0 left-0 flex w-full items-center justify-center flex-row z-40"
          style={{ zIndex: 101 }}
        >
          <div className="flex flex-row items-center justify-center mt-4 gap-4">
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
        </div>
      )}

      <div className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        <div
          className={`w-full h-auto flex items-center flex-col justify-center ${bgColor} transition-colors duration-500`}
        >
          {!gameGlobals.isGameRunning && (
            <PlayThumbButton
              src="/images/play-thumb.jpg"
              onClick={handleStartGame}
              className={`transition-opacity duration-500 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            />
          )}
        </div>
        <div
          ref={pixiContainerRef}
          className={`${
            gameGlobals.isGameRunning
              ? "absolute top-0 left-0 w-full h-full flex items-center justify-center z-40"
              : "hidden"
          }`}
          id="pixi-container"
        />
        {gameGlobals.isGameRunning && <Game />}
      </div>
    </>
  );
}
