import React, { useState, useRef, useEffect } from "react";
import useDebugStore from "@/stores/debug/debugStore";
import cogIcon from "@/public/icons/cog.svg";
import Image from "next/image";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

const DebugMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const debugStore = useDebugStore();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [shouldDisplaySkip, setShouldDisplaySkip] = useState(false);

  useEffect(() => {
    setShouldDisplaySkip(localStorage.getItem("shouldDisplaySkip") === "true");
  }, []);

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

  const toggleHlsMessages = () => {
    debugStore.setShowHlsMessages(!debugStore.showHlsMessages);
  };

  const toggleShouldDisplaySkip = () => {
    const newValue = !shouldDisplaySkip;
    setShouldDisplaySkip(newValue);
    localStorage.setItem("shouldDisplaySkip", newValue.toString());
  };

  const addCoin = () => {
    useGameGlobalsStore.getState().addCoinsAndCheckWin(1);
  };

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        cursor: "move",
        opacity: fadeIn ? 1 : 0,
        transition: "opacity 0.5s ease",
        zIndex: 10001,
      }}
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
        <div className="bg-black border border-gray-300 rounded flex flex-col shadow-lg p-3 mt-2 gap-1 h-[70vh] overflow-y-scroll">
          <p className="text-white text-xs mb-2">
            isMobile:{" "}
            {useGameGlobalsStore.getState().isMobile ? "true" : "false"}
          </p>
          <div className="flex flex-row justify-between items-center gap-1">
            <button
              onClick={toggleHitboxes}
              className="flex-grow text-white border border-white rounded-full p-1 text-sm"
            >
              Toggle Hitboxes
            </button>
            <span
              className={`text-white text-xs ${
                debugStore.showHitboxes ? "text-green-500" : "text-red-500"
              }`}
            >
              {debugStore.showHitboxes ? "ON" : "OFF"}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-1">
            <button
              onClick={toggleLoadingIndicators}
              className="flex-grow text-white border border-white rounded-full p-1 text-sm"
            >
              Toggle Loading Indicators
            </button>
            <span
              className={`text-white text-xs ${
                debugStore.showLoadingIndicators
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {debugStore.showLoadingIndicators ? "ON" : "OFF"}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-1">
            <button
              onClick={toggleDebugInfo}
              className="flex-grow text-white border border-white rounded-full p-1 text-sm"
            >
              Toggle Debug Info
            </button>
            <span
              className={`text-white text-xs ${
                debugStore.showDebugInfo ? "text-green-500" : "text-red-500"
              }`}
            >
              {debugStore.showDebugInfo ? "ON" : "OFF"}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-1">
            <button
              onClick={toggleCurrentVideoTime}
              className="flex-grow text-white border border-white rounded-full p-1 text-sm"
            >
              Toggle Current Video Time
            </button>
            <span
              className={`text-white text-xs ${
                debugStore.showCurrentVideoTime
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {debugStore.showCurrentVideoTime ? "ON" : "OFF"}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-1">
            <button
              onClick={toggleShowCoins}
              className="flex-grow text-white border border-white rounded-full p-1 text-sm"
            >
              Toggle Show Coins
            </button>
            <span
              className={`text-white text-xs ${
                debugStore.showCoins ? "text-green-500" : "text-red-500"
              }`}
            >
              {debugStore.showCoins ? "ON" : "OFF"}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-1">
            <button
              onClick={toggleHlsMessages}
              className="flex-grow text-white border border-white rounded-full p-1 text-sm"
            >
              Toggle HLS Messages
            </button>
            <span
              className={`text-white text-xs ${
                debugStore.showHlsMessages ? "text-green-500" : "text-red-500"
              }`}
            >
              {debugStore.showHlsMessages ? "ON" : "OFF"}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-1">
            <label className="flex-grow text-white border border-white rounded-full p-1 text-sm">
              <input
                type="checkbox"
                checked={shouldDisplaySkip}
                onChange={toggleShouldDisplaySkip}
                className="mr-1 h-3 w-3"
              />
              Should Display Skip
            </label>
            <span
              className={`text-white text-xs ${
                shouldDisplaySkip ? "text-green-500" : "text-red-500"
              }`}
            >
              {shouldDisplaySkip ? "ON" : "OFF"}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-1">
            <button
              onClick={addCoin}
              className="flex-grow text-white border border-white rounded-full p-1 text-sm"
            >
              Add Coin
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugMenu;
