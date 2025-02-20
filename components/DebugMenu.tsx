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
        <div className="bg-black border border-gray-300 rounded flex flex-col shadow-lg p-4 mt-2 gap-2">
          <div className="flex flex-row justify-between items-center gap-2">
            <button
              onClick={toggleHitboxes}
              className="flex-grow text-white border border-white rounded-full p-2"
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
          <div className="flex flex-row justify-between items-center gap-2">
            <button
              onClick={toggleHlsMessages}
              className="flex-grow text-white border border-white rounded-full p-2"
            >
              Toggle HLS Messages
            </button>
            <span
              className={`text-white ${
                debugStore.showHlsMessages ? "text-green-500" : "text-red-500"
              }`}
            >
              {debugStore.showHlsMessages ? "ON" : "OFF"}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
            <label className="flex-grow text-white border border-white rounded-full p-2">
              <input
                type="checkbox"
                checked={shouldDisplaySkip}
                onChange={toggleShouldDisplaySkip}
                className="mr-2"
              />
              Should Display Skip
            </label>
            <span
              className={`text-white ${
                shouldDisplaySkip ? "text-green-500" : "text-red-500"
              }`}
            >
              {shouldDisplaySkip ? "ON" : "OFF"}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
            <button
              onClick={addCoin}
              className="flex-grow text-white border border-white rounded-full p-2"
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
