import React from "react";
import Image from "next/image";

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
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 play-thumb-button ${className}`}
      style={{ zIndex: 999999 }}
    >
      <Image
        src={src}
        alt="Play Thumbnail"
        width={1920}
        height={1080}
        style={{ objectFit: "cover", width: "full", height: "auto" }}
        priority
      />
    </button>
  );
};

export default PlayThumbButton;
