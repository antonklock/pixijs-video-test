import React, { useState, useRef } from "react";
import useDebugStore from "@/stores/debug/debugStore";

const DebugMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const debugStore = useDebugStore();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 4, y: 4 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        cursor: "move",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={toggleMenu}
        className="bg-black border border-white rounded-full p-4"
      >
        <i className="fas fa-cog text-white text-3xl"></i>
      </button>
      {isOpen && (
        <div className="bg-black border border-gray-300 rounded shadow-lg p-4 mt-2">
          <div className="flex flex-row justify-between items-center gap-2">
            <button
              onClick={toggleHitboxes}
              className="block mb-2 text-white border border-white rounded-full p-2"
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
              className="block text-white border border-white rounded-full p-2"
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
        </div>
      )}
    </div>
  );
};

export default DebugMenu;
