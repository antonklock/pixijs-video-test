import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Hls from "hls.js";

interface PlayThumbButtonProps {
  src: string;
  onClick: () => void;
  className?: string;
}

const PlayThumbButton: React.FC<PlayThumbButtonProps> = ({
  src,
  onClick,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const video = videoRef.current;
    const videoSrc = "https://klockworks.xyz/ryg-title/playlist.m3u8";

    if (video) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS support
        video.src = videoSrc;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      } else if (Hls.isSupported()) {
        // HLS.js fallback
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
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
      <button
        onClick={handleClick}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 play-thumb-button ${className} transition-opacity duration-1000 ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: 999999 }}
      >
        <Image
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
            isMounted ? "opacity-100" : "opacity-0"
          }`}
          src={"/images/play-game.png"}
          alt="Play Thumbnail"
          width={200}
          height={200}
          style={{ objectFit: "cover", width: "full", height: "auto" }}
          priority
        />
        <video
          controls={false}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`transition-opacity duration-1000 ${
            isMounted ? "opacity-100" : "opacity-0"
          }`}
        >
          Your browser does not support the video tag.
        </video>
      </button>
    </>
  );
};

export default PlayThumbButton;
