// "use client";

// import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
// import { useRef, useState, useEffect } from "react";
// import * as Tone from "tone";

// const MusicPlayer = () => {
//   const playerRef = useRef<Tone.Player | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [hasLoaded, setHasLoaded] = useState(false);
//   const musicUrl = useRef(
//     "https://klockworks.xyz/music/ybp-raiseyourglass.mp3"
//   );

//   const [transportSeconds, setTransportSeconds] = useState(0);
//   const loopRef = useRef<Tone.Loop | null>(null);

//   const { isGameRunning, gameState, setGameState, switchToScene } =
//     useGameGlobalsStore();

//   useEffect(() => {
//     if (isGameRunning && !isPlaying && !hasLoaded) loadMusic();

//     return () => {
//       playerRef.current?.stop();
//       playerRef.current?.dispose();
//       playerRef.current = null;
//       setIsPlaying(false);
//       setHasLoaded(false);
//     };
//   }, []);

//   const loadMusic = async () => {
//     playerRef.current = new Tone.Player(musicUrl.current).toDestination();
//     await playerRef.current.load(musicUrl.current);

//     playerRef.current?.sync();
//     Tone.getTransport().start();
//     if (playerRef.current?.state !== "started") {
//       playerRef.current?.start();
//       setIsPlaying(true);
//     }
//     setHasLoaded(true);

//     if (loopRef.current) {
//       loopRef.current.stop();
//       loopRef.current.dispose();
//     }

//     // End game at 196 seconds
//     const loop = new Tone.Loop((time) => {
//       setTransportSeconds(Tone.getTransport().seconds);
//       if (Tone.getTransport().seconds > 196) {
//         if (gameState === "playing") {
//           setGameState("lost");
//           switchToScene("L1");
//         } else if (gameState === "won") {
//           switchToScene("A6-B");
//         } else {
//           console.log(`Can't lose game when state is ${gameState}`);
//         }
//       }
//     }, "4n").start();

//     loopRef.current = loop;
//   };

//   return null;
// };

// export default MusicPlayer;
