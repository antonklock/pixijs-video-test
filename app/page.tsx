"use client";

import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useRef, useState } from "react";
import TitleScreen from "@/components/TitleScreen";
import Game from "@/components/Game";
import Nav from "@/components/Nav";
import { Howl } from "howler";

const musicUrl = "https://klockworks.xyz/music/ybp-raiseyourglass.mp3";

export default function Home() {
  const gameGlobals = useGameGlobalsStore();
  const [isFading, setIsFading] = useState(true);
  const [bgColor, setBgColor] = useState("bg-[#0a0a0a]");
  const pixiContainerRef = useRef<HTMLDivElement>(null);
  const [gameReady, setGameReady] = useState(false);

  const [gameMusicVolume, setGameMusicVolume] = useState(0);
  const [gameMusicMuted, setGameMusicMuted] = useState(false);
  const [gameMusicPlaying, setGameMusicPlaying] = useState(false);
  const [gameMusicPaused, setGameMusicPaused] = useState(false);
  const [gameMusicSeeking, setGameMusicSeeking] = useState(false);

  useEffect(() => {
    gameGlobals.setPixiContainer(pixiContainerRef.current);
    setIsFading(false);
  }, []);

  useEffect(() => {
    const volume = gameGlobals.musicPlayer?.volume();
    if (volume) setGameMusicVolume(volume);
  }, [gameGlobals.musicPlayer, gameGlobals, gameGlobals.musicPlayer?.volume]);

  useEffect(() => {
    if (gameGlobals.musicPlayer) {
      gameGlobals.musicPlayer.on("play", () => {
        setGameMusicPlaying(true);
        setGameMusicPaused(false);
        setGameMusicSeeking(false);
      });
      gameGlobals.musicPlayer.on("pause", () => {
        setGameMusicPlaying(false);
        setGameMusicPaused(true);
        setGameMusicSeeking(false);
      });
      gameGlobals.musicPlayer.on("seek", () => setGameMusicSeeking(true));
      gameGlobals.musicPlayer.on("volume", (volume) => {
        setGameMusicVolume(volume);
        setGameMusicMuted(volume === 0);
      });
    }
  }, [gameGlobals.musicPlayer]);

  useEffect(() => {
    if (gameGlobals.isGameRunning) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [gameGlobals.isGameRunning]);

  const handleStartGame = async () => {
    await handleStartMusic();

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
      music.seek(8.25);
      return Promise.resolve();
    } else {
      try {
        const gameMusic = new Howl({
          src: [musicUrl],
          loop: false,
        });

        gameGlobals.setMusicPlayer(gameMusic);
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
      <p className="text-white text-center absolute bottom-0 left-0 w-full z-[999999]">
        Game music volume: {gameMusicVolume}
      </p>
      <p className="text-white text-center absolute bottom-4 left-0 w-full z-[999999]">
        Game music playing: {gameMusicPlaying ? "true" : "false"}
      </p>
      <p className="text-white text-center absolute bottom-8 left-0 w-full z-[999999]">
        Game music paused: {gameMusicPaused ? "true" : "false"}
      </p>
      <p className="text-white text-center absolute bottom-12 left-0 w-full z-[999999]">
        Game music seeking: {gameMusicSeeking ? "true" : "false"}
      </p>
      <p className="text-white text-center absolute bottom-16 left-0 w-full z-[999999]">
        Game music muted: {gameMusicMuted ? "true" : "false"}
      </p>
      {/* <DebugMenu /> */}
    </>
  );
}
