"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Hls from "hls.js";

interface PlayThumbButtonProps {
  onClick: () => void;
  className?: string;
}

const PlayGame: React.FC<PlayThumbButtonProps> = ({ onClick, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHlsReady, setIsHlsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const videoSrc = "https://klockworks.xyz/ryg-title/playlist.m3u8";

    setIsMounted(true);

    if (video) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS support
        video.src = videoSrc;
        video.addEventListener("loadedmetadata", () => {
          video.play();
          setIsHlsReady(true);
        });
      } else if (Hls.isSupported()) {
        // HLS.js fallback
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
          setTimeout(() => {
            setIsHlsReady(true);
          }, 250);
        });

        // Cleanup on component unmount
        return () => {
          hls.destroy();
        };
      } else {
        console.error("This browser does not support HLS.");
      }
    }
  }, []);

  const handleClick = () => {
    onClick();
  };

  return (
    <>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 play-thumb-button w-full h-full ${className}`}
      >
        <div
          className={`absolute top-1/2 pb-10 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[3000ms] flex flex-col items-center justify-center  ${
            isMounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 513 }}
        >
          <Image
            className={``}
            src={"/logos/ybp-Logo-white-256.png"}
            alt="Play Thumbnail"
            width={150}
            height={150}
            style={{ zIndex: 513 }}
          />

          <button onClick={handleClick} className={``} style={{ zIndex: 512 }}>
            <Image
              src={"/images/play-game.png"}
              alt="Play Thumbnail"
              width={150}
              height={150}
              style={{
                objectFit: "cover",
                width: "auto",
                height: "auto",
                zIndex: 11,
              }}
              priority
            />
          </button>
        </div>
        <video
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-[3000ms] pointer-events-none ${
            isHlsReady ? "opacity-100" : "opacity-0"
          }`}
          style={{
            zIndex: 10,
            objectFit: "cover",
          }}
          controls={false}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default PlayGame;
