// "use client";

// import useDebugStore from "@/stores/debug/debugStore";
// import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
// import { SceneObject } from "@/types";
// import { useRef, useState, useEffect } from "react";
// import { Howl } from "howler";

// const MusicPlayer = () => {

//   const [transportSeconds, setTransportSeconds] = useState(0);

//   const [currentVideoTime, setCurrentVideoTime] = useState(0);

//   return (
//     <>
//       {useDebugStore.getState().showCurrentVideoTime && (
//         <div
//           className="absolute top-0 left-20 text-white"
//           style={{
//             zIndex: "100000",
//           }}
//         >
//           <p>Music time: {transportSeconds}</p>
//           <p>Current video time: {currentVideoTime}</p>
//         </div>
//       )}
//     </>
//   );
// };

// export const seekMusicToTime = async (time: number) => {
//   const fadeDuration = 250;
//   const gameMusic = useGameGlobalsStore.getState().musicPlayer;

//   if (gameMusic) {
//     // Seek to the desired time
//     gameMusic.seek(time);
//     console.log("Seeked to ", time);
// };

// export default MusicPlayer;
