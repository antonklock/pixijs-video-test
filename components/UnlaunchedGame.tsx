"use client";

import Hls from "hls.js";
import Image from "next/image";
import { useEffect, useRef } from "react";
import CountdownTimer from "./CountDownTimer";

export default function UnlaunchedGame() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource("https://klockworks.xyz/ryg-title/playlist.m3u8");
        hls.attachMedia(videoRef.current);
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        // For Safari, which has native HLS support
        videoRef.current.src = "https://klockworks.xyz/ryg-title/playlist.m3u8";
      }
    }
  }, []);

  return (
    <>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 play-thumb-button w-full h-full`}
      >
        <div
          className={`py-8 absolute top-1/2 pb-10 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[3000ms] flex flex-col items-center justify-center w-full`}
          style={{ zIndex: 513 }}
        >
          <Image
            className={"w-32 sm:w-24"}
            src={"/logos/ybp-Logo-white-256.png"}
            alt="Play Thumbnail"
            width={100}
            height={100}
            style={{ zIndex: 513 }}
          />
          <h1 className={`text-white-200 md:text-4xl text-3xl mb-4`}>
            Raise Your Glass
          </h1>

          <button
            className={"w-44 sm:w-24 flex flex-row justify-center mb-2"}
            style={{ zIndex: 512 }}
          >
            <Image
              src={"/images/play-game.png"}
              alt="Play Thumbnail"
              width={75}
              height={75}
              style={{
                objectFit: "cover",
                width: "auto",
                height: "auto",
                zIndex: 11,
                opacity: 0.15,
              }}
              priority
            />
          </button>
          <CountdownTimer />
        </div>
        <video
          className={`absolute top-0 left-0 w-full h-full`}
          style={{
            objectFit: "cover",
          }}
          controls={false}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}
