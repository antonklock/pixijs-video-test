"use client";

import Game from "@/components/Game";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

export default function Home() {
  const gameGlobals = useGameGlobalsStore();
  const [isFading, setIsFading] = useState(false);
  const [bgColor, setBgColor] = useState("bg-[#0a0a0a]");
  const [gameMusic, setGameMusic] = useState<Howl | null>(null);
  const pixiContainerRef = useRef<HTMLDivElement>(null);

  let audioContext: AudioContext | null = null;
  let audioSource: MediaElementAudioSourceNode | null = null;
  const audioElement = useRef<HTMLAudioElement>(null);

  const initAudioContext = (audioUrl: string) => {
    if (!audioContext) {
      audioContext = new AudioContext();
      if (!audioElement.current) return;
      audioSource = audioContext.createMediaElementSource(audioElement.current);
      audioSource.connect(audioContext.destination);
    }
    return audioElement;
  };

  const musicUrl = useRef(
    "https://klockworks.xyz/music/ybp-raiseyourglass.mp3"
  );

  useEffect(() => {
    gameGlobals.setPixiContainer(pixiContainerRef.current);
  }, []);

  const handleStartGame = async () => {
    handleStartMusic();

    setIsFading(true);
    setBgColor("bg-black");
    setTimeout(() => {
      gameGlobals.setIsGameRunning(true);
    }, 500);
  };

  async function handleStartMusic() {
    await loadMusic();
    gameMusic?.play();
  }

  const loadMusic = async () => {
    // initAudioContext(musicUrl.current);

    const newHowl = new Howl({
      src: musicUrl.current,
      loop: true,
      format: ["mp3"],
      html5: true,
    });

    setGameMusic(newHowl);

    newHowl.play();
    gameGlobals.setGameMusic(newHowl);
    return newHowl;
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "e" || event.key === "E") {
        console.log("pressed");

        const gameGlobals = useGameGlobalsStore.getState();

        const player = gameGlobals.currentScene?.video
          .player as HTMLVideoElement;
        if (player) player.currentTime = player.currentTime + 10;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
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
        <audio ref={audioElement} src={musicUrl.current} />
      </div>
    </>
  );
}
