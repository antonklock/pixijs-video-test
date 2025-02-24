"use client";

import useDebugStore from "@/stores/debug/debugStore";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import { SceneObject } from "@/types";
import { useRef, useState, useEffect } from "react";
// import * as Tone from "tone";
import { Howl, Howler } from "howler";

const MusicPlayer = () => {
  const playerRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const musicUrl = useRef(
    "https://klockworks.xyz/music/ybp-raiseyourglass.mp3"
  );

  const [transportSeconds, setTransportSeconds] = useState(0);
  // const loopRef = useRef<Tone.Loop | null>(null);

  const { currentScene } = useGameGlobalsStore();
  const [currentVideo, setCurrentVideo] = useState<HTMLVideoElement | null>(
    null
  );
  const [currentVideoTime, setCurrentVideoTime] = useState(0);

  const { isGameRunning, setGameState, switchToScene } = useGameGlobalsStore();

  const currentVideoRef = useRef<HTMLVideoElement | null>(null);
  const currentSceneRef = useRef<SceneObject | null>(null);

  const [isPrepared, setIsPrepared] = useState(false);

  // useEffect(() => {
  //   if (isGameRunning && !isPlaying && !hasLoaded) loadMusic();

  //   return () => {
  //     // playerRef.current?.stop();
  //     // playerRef.current?.dispose();
  //     // playerRef.current = null;
  //     setIsPlaying(false);
  //     setHasLoaded(false);
  //   };
  // }, [isGameRunning]);

  // useEffect(() => {
  //   const currentVideo =
  //     useGameGlobalsStore.getState().currentScene?.video.player;
  //   if (currentVideo) {
  //     setCurrentVideo(currentVideo);
  //     currentVideoRef.current = currentVideo;
  //     currentSceneRef.current = useGameGlobalsStore.getState().currentScene;
  //     console.log("Current video set");
  //   }
  // }, [currentScene]);

  useEffect(() => {
    // loadMusic();
    // const link = document.createElement("link");
    // link.rel = "preload";
    // link.href = musicUrl.current;
    // link.as = "audio";
    // document.head.appendChild(link);
  }, []);

  // const loadMusic = async () => {
  //   if (playerRef.current) return;
  //   console.log("Loading music...");

  //   const howl = new Howl({
  //     src: [musicUrl.current],
  //     loop: false,
  //   });
  //   playerRef.current = howl;

  //   if (!playerRef.current) return console.error("Failed to create howl");

  //   const gameGlobals = useGameGlobalsStore.getState();
  //   const setMusicPlayer = gameGlobals.setMusicPlayer;
  //   setMusicPlayer(playerRef.current);

  //   setHasLoaded(true);
  //   setIsPrepared(true);

  //   const musicTimeInterval = setInterval(() => {
  //     gameGlobals.setGameTime(playerRef.current?.seek() || 0);
  //   }, 250);
  // };

  // const handlePrepareMusic = async () => {
  //   await loadMusic();
  // };

  // const handleStartMusic = async () => {
  //   if (!isPrepared) {
  //     await handlePrepareMusic();
  //   }

  //   const music = playerRef.current;
  //   if (music) {
  //     music.play();
  //   } else {
  //     console.warn("Music player not found");
  //   }
  // };

  return (
    <>
      {useDebugStore.getState().showCurrentVideoTime && (
        <div
          className="absolute top-0 left-20 text-white"
          style={{
            zIndex: "100000",
          }}
        >
          <p>Music time: {transportSeconds}</p>
          <p>Current video time: {currentVideoTime}</p>
        </div>
      )}
    </>
  );
};

// const syncVideoTime = (
//   video: HTMLVideoElement,
//   player: Tone.Player,
//   offset: number = 0
// ) => {
//   const syncInterval = setInterval(() => {
//     const videoCurrentTime = video.currentTime;
//     const transportCurrentTime = player.toSeconds();

//     const timeDifference = videoCurrentTime - transportCurrentTime;

//     if (Math.abs(timeDifference + offset) > 0.5) {
//       // Adjust playback rate to sync
//       video.playbackRate = timeDifference > 0 ? 1.25 : 0.75;
//       console.log("Adjusting playback rate to ", video.playbackRate);
//     } else {
//       // Stop adjusting when within 0.5 seconds
//       clearInterval(syncInterval);
//       video.playbackRate = 1; // Reset playback rate to normal
//     }
//   }, 100); // Check every 100ms
// };

export const seekMusicToTime = async (time: number) => {
  const fadeDuration = 250;
  const gameMusic = useGameGlobalsStore.getState().musicPlayer;

  if (gameMusic) {
    // Fade down the volume
    // await fadeVolume(gameMusic, -50, fadeDuration); // Fade out to silence
    // gameMusic.volume(-50);
    // console.log("Faded down to ", gameMusic.volume());

    // Seek to the desired time
    gameMusic.seek(time);
    console.log("Seeked to ", time);
    // Fade up the volume
    // fadeVolume(gameMusic, 0, fadeDuration); // Fade back to normal volume
    // console.log("Faded up to ", gameMusic.volume());
  }
  // Tone.getTransport().seconds = time; // This line is redundant now
};

const fadeVolume = (player: Howl, targetVolume: number, duration: number) => {
  // return new Promise<void>((resolve) => {
  //   const currentVolume = player.volume();
  //   const delta = targetVolume - currentVolume;
  //   const step = delta / (duration / 10); // Adjust step calculation for smoother transition
  //   let stepsRemaining = duration / 10;
  //   const fade = () => {
  //     if (stepsRemaining > 0) {
  //       player.volume(currentVolume + step);
  //       stepsRemaining--;
  //       requestAnimationFrame(fade);
  //     } else {
  //       player.volume(targetVolume); // Ensure final volume is set
  //       resolve();
  //     }
  //   };
  //   fade();
  // });
};

export default MusicPlayer;
