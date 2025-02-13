"use client";

import Game from "@/components/Game";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useRef, useState } from "react";
import * as Tone from "tone";

export default function Home() {
  const gameGlobals = useGameGlobalsStore();
  const [isFading, setIsFading] = useState(false);
  const [bgColor, setBgColor] = useState("bg-[#0a0a0a]");

  const playerRef = useRef<Tone.Player | null>(null);
  const loopRef = useRef<Tone.Loop | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [transportSeconds, setTransportSeconds] = useState(0);

  const { gameState, setGameState, switchToScene } = gameGlobals;

  const musicUrl = useRef(
    "https://klockworks.xyz/music/ybp-raiseyourglass.mp3"
  );

  const handleStartGame = async () => {
    handleStartMusic();

    setIsFading(true);
    setBgColor("bg-black");
    setTimeout(() => {
      gameGlobals.setIsGameRunning(true);
    }, 500);
  };

  function handleStartMusic() {
    // Tone.getTransport().start();
    loadMusic();
  }

  const loadMusic = async () => {
    playerRef.current = new Tone.Player(musicUrl.current).toDestination();
    await playerRef.current.load(musicUrl.current);

    // playerRef.current?.sync();
    Tone.getTransport().start();
    // if (playerRef.current?.state !== "started") {
    //   playerRef.current?.start();
    //   setIsPlaying(true);
    // }
    // setHasLoaded(true);

    // if (loopRef.current) {
    //   loopRef.current.stop();
    //   loopRef.current.dispose();
    // }

    // End game at 196 seconds
    // const loop = new Tone.Loop((time) => {
    //   setTransportSeconds(Tone.getTransport().seconds);
    //   if (Tone.getTransport().seconds > 196) {
    //     if (gameState === "playing") {
    //       setGameState("lost");
    //       switchToScene("L1");
    //     } else if (gameState === "won") {
    //       switchToScene("A6-B");
    //     } else {
    //       console.log(`Can't lose game when state is ${gameState}`);
    //     }
    //   }
    // }, "4n").start();

    // loopRef.current = loop;
  };

  return (
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
  );
}
