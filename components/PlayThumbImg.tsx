"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Hls from "hls.js";
import screenfull from "screenfull";

interface PlayThumbButtonProps {
  onClick: () => void;
  className?: string;
  isPortrait?: boolean;
  isMobile?: boolean;
}

const PlayGame: React.FC<PlayThumbButtonProps> = ({
  onClick,
  className,
  isPortrait,
  isMobile,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHlsReady, setIsHlsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showFullscreenButton, setShowFullscreenButton] = useState(false);

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

  useEffect(() => {
    // Check if we're on mobile
    // if (screen.width < 768) return;

    // const isChrome = /chrome/i.test(navigator.userAgent);
    // const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    // if (!isChrome) return;
    // if (isSafari) return console.log("Fullscreen not yet supported in Safari.");

    setShowFullscreenButton(true);
  }, []);

  return (
    <>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 play-thumb-button w-full h-full ${className}`}
      >
        <div
          className={`absolute top-1/2 pb-10 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[3000ms] flex flex-col items-center justify-center w-full ${
            isMounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 513 }}
        >
          <Image
            className={"w-32"}
            src={"/logos/ybp-Logo-white-256.png"}
            alt="Play Thumbnail"
            width={150}
            height={150}
            style={{ zIndex: 513 }}
          />
          <h1 className={`text-white-200 md:text-4xl text-3xl mb-4`}>
            Raise Your Glass
          </h1>

          {isMobile ? (
            isPortrait ? (
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={"/images/rotate-phone.svg"}
                  alt="Rotate phone icon"
                  width={35}
                  height={35}
                />
                <p className="text-white-200 text-sm">Rotate phone to play</p>
              </div>
            ) : (
              <button
                onClick={handleClick}
                className={"md:w-40 w-32"}
                style={{ zIndex: 512 }}
              >
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
            )
          ) : (
            <button
              onClick={handleClick}
              className={"md:w-40 w-32"}
              style={{ zIndex: 512 }}
            >
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
          )}
          {showFullscreenButton && (
            <button
              onClick={() => {
                if (screenfull.isEnabled) {
                  screenfull.request();
                }
              }}
              className={
                "opacity-25 hover:opacity-75 mt-4 bg-white-200 text-white-200 font-semibold py-2 px-4 rounded-xl shadow hover:bg-white-300 transition duration-300 border border-white"
              }
            >
              Fullscreen
            </button>
          )}
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
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default PlayGame;
