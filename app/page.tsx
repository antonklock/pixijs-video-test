"use client";

import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useRef, useState } from "react";
import TitleScreen from "@/components/TitleScreen";
import Game from "@/components/Game";
import Nav from "@/components/Nav";
import { Howl } from "howler";
import DebugMenu from "@/components/DebugMenu";

const musicUrl = "https://klockworks.xyz/music/ybp-raiseyourglass.mp3";

export default function Home() {
  const gameGlobals = useGameGlobalsStore();
  const [isFading, setIsFading] = useState(false);
  const [bgColor, setBgColor] = useState("bg-[#0a0a0a]");
  const pixiContainerRef = useRef<HTMLDivElement>(null);
  const [gameReady, setGameReady] = useState(false);

  const musicPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (gameGlobals.isGameRunning) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [gameGlobals.isGameRunning]);

  const handleStartGame = async () => {
    // await handleStartMusic();
    musicPlayerRef.current?.play();
    if (musicPlayerRef.current) {
      gameGlobals.setMusicPlayer(musicPlayerRef.current);
      musicPlayerRef.current.currentTime = 8.25;
    }

    const gameMusic = musicPlayerRef.current;

    const loseTime = gameGlobals.loseTime;

    const gameTimeInterval = setInterval(() => {
      if (!gameMusic) return console.warn("Game music not found");
      const currentTime = gameMusic?.currentTime;

      gameGlobals.setGameTime(currentTime);

      if (currentTime > loseTime) {
        if (useGameGlobalsStore.getState().gameState === "playing") {
          gameGlobals.switchToScene("L1");
          gameGlobals.setGameState("lost");
        } else if (useGameGlobalsStore.getState().gameState === "won") {
          gameGlobals.switchToScene("H6-B");
        }
      }
    }, 100);

    setIsFading(true);
    setBgColor("bg-black");
    await gameGlobals.addNewScene("G0");
    gameGlobals.switchToScene("G0");
    const currentTime = new Date().toLocaleTimeString();
    // console.log("Video started at:", currentTime);
    setTimeout(() => {
      gameGlobals.setIsGameRunning(true);
    }, 500);
  };

  useEffect(() => {
    if (pixiContainerRef.current && !gameReady) {
      setGameReady(true);
    }

    // Cleanup function
    return () => {
      if (gameGlobals.cleanup) {
        gameGlobals.cleanup();
      }
    };
  }, [pixiContainerRef.current]);

  async function handleStartMusic() {
    const music = gameGlobals.musicPlayer;
    if (music) {
      music.play();
      // music.seek(8.25);
      return Promise.resolve();
    } else {
      try {
        const gameMusic = new Howl({
          src: [musicUrl],
          loop: false,
        });

        gameMusic.play();
        gameMusic.seek(8.25);

        const loseTime = gameGlobals.loseTime;

        const gameTimeInterval = setInterval(() => {
          const currentTime = gameMusic.seek();

          gameGlobals.setGameTime(currentTime);

          if (currentTime > loseTime) {
            if (useGameGlobalsStore.getState().gameState === "playing") {
              gameGlobals.switchToScene("L1");
              gameGlobals.setGameState("lost");
            } else if (useGameGlobalsStore.getState().gameState === "won") {
              gameGlobals.switchToScene("H6-B");
            }
          }
        }, 100);

        const currentTime = new Date().toLocaleTimeString();
        // console.log("Music started at:", currentTime);

        return Promise.resolve();
      } catch (error) {
        console.error("Error starting music", error);
        return Promise.reject(error);
      }
    }
  }

  return (
    <>
      <Nav isGameRunning={gameGlobals.isGameRunning} isFading={isFading} />
      <div
        ref={pixiContainerRef}
        className={`${
          gameGlobals.isGameRunning
            ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            : "hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        }`}
        id="pixi-container"
        style={{
          zIndex: 1001,
        }}
      />

      <div className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        <TitleScreen
          handleStartGame={handleStartGame}
          isFading={isFading}
          bgColor={bgColor}
          isGameRunning={gameGlobals.isGameRunning}
        />
      </div>
      <Game />
      <DebugMenu />
      <audio
        ref={musicPlayerRef}
        id="game-music"
        src={musicUrl}
        onError={(e) => console.error("Error loading audio", e)}
      />
    </>
  );
}
