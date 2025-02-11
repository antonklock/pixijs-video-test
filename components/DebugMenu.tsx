import React, { useState, useRef, useEffect } from "react";
import useDebugStore from "@/stores/debug/debugStore";
import cogIcon from "@/public/icons/cog.svg";
import Image from "next/image";

const DebugMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const debugStore = useDebugStore();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 4, y: 4 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [fadeIn, setFadeIn] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    const touch = e.touches[0];
    setOffset({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragging) {
      const touch = e.touches[0];
      setPosition({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setDragging(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleHitboxes = () => {
    debugStore.setShowHitboxes(!debugStore.showHitboxes);
  };

  const toggleLoadingIndicators = () => {
    debugStore.setShowLoadingIndicators(!debugStore.showLoadingIndicators);
  };

  const toggleDebugInfo = () => {
    debugStore.setShowDebugInfo(!debugStore.showDebugInfo);
  };

  const toggleCurrentVideoTime = () => {
    debugStore.setShowCurrentVideoTime(!debugStore.showCurrentVideoTime);
  };

  const toggleShowCoins = () => {
    debugStore.setShowCoins(!debugStore.showCoins);
  };

  useEffect(() => {
    setFadeIn(true);
  }, []);

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, isOpen]);

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        cursor: "move",
        opacity: fadeIn ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={toggleMenu}
        className="bg-black border border-[#AAAAAA] rounded-full p-1"
      >
        <Image
          src={cogIcon}
          alt="Settings"
          className="text-white w-3 h-3"
          style={{ opacity: 0.75 }}
        />
      </button>
      {isOpen && (
        <div className="bg-black border border-gray-300 rounded shadow-lg p-4 mt-2">
          <div className="flex flex-row justify-between items-center gap-2">
            <button
              onClick={toggleHitboxes}
              className="flex-grow mb-2 text-white border border-white rounded-full p-2"
            >
              Toggle Hitboxes
            </button>
            <span
              className={`text-white ${
                debugStore.showHitboxes ? "text-green-500" : "text-red-500"
              }`}
            >
              {debugStore.showHitboxes ? "ON" : "OFF"}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
            <button
              onClick={toggleLoadingIndicators}
              className="flex-grow text-white border border-white rounded-full p-2"
            >
              Toggle Loading Indicators
            </button>
            <span
              className={`text-white ${
                debugStore.showLoadingIndicators
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {debugStore.showLoadingIndicators ? "ON" : "OFF"}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
            <button
              onClick={toggleDebugInfo}
              className="flex-grow text-white border border-white rounded-full p-2"
            >
              Toggle Debug Info
            </button>
            <span
              className={`text-white ${
                debugStore.showDebugInfo ? "text-green-500" : "text-red-500"
              }`}
            >
              {debugStore.showDebugInfo ? "ON" : "OFF"}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
            <button
              onClick={toggleCurrentVideoTime}
              className="flex-grow text-white border border-white rounded-full p-2"
            >
              Toggle Current Video Time
            </button>
            <span
              className={`text-white ${
                debugStore.showCurrentVideoTime
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {debugStore.showCurrentVideoTime ? "ON" : "OFF"}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
            <button
              onClick={toggleShowCoins}
              className="flex-grow text-white border border-white rounded-full p-2"
            >
              Toggle Show Coins
            </button>
            <span
              className={`text-white ${
                debugStore.showCoins ? "text-green-500" : "text-red-500"
              }`}
            >
              {debugStore.showCoins ? "ON" : "OFF"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugMenu;
