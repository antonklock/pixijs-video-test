import React, { useEffect, useState } from "react";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import useDebugStore from "@/stores/debug/debugStore";
import * as PIXI from "pixi.js";

const DebugInfo = () => {
  const [hitboxes, setHitboxes] = useState<string[]>([]);
  const showDebugInfo = useDebugStore((state) => state.showDebugInfo);
  const { stagedScenes, currentScene, app } = useGameGlobalsStore();

  useEffect(() => {
    if (!app) return;

    const updateHitboxes = () => {
      const hitboxNames: string[] = [];
      app.stage.children.forEach((child: PIXI.Container) => {
        if (child.label && child.label.includes("HB")) {
          hitboxNames.push(child.label);
        }
      });
      setHitboxes(hitboxNames);
    };

    // Initial hitbox update
    updateHitboxes();

    // Use PIXI ticker to periodically check for hitbox updates
    const ticker = PIXI.Ticker.shared;
    ticker.add(updateHitboxes);

    return () => {
      ticker.remove(updateHitboxes); // Cleanup ticker listener
    };
  }, [app]);

  if (!showDebugInfo) return null;

  return (
    <div className="fixed top-0 right-0 bg-black bg-opacity-75 text-white p-4 m-4 rounded-lg max-w-md overflow-auto max-h-[90vh]">
      <h2 className="text-xl font-bold mb-4">Debug Info</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Current Scene</h3>
        <p>{currentScene?.id || "None"}</p>
        <div className="mt-2">
          <h4 className="font-medium">Next Scenes:</h4>
          <ul className="list-disc list-inside">
            {currentScene?.nextScenes.map((scene, index) => (
              <li key={index}>{scene}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Staged Scenes</h3>
        <ul className="list-disc list-inside">
          {stagedScenes.map((scene, index) => (
            <li key={index}>{scene.id}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Active Hitboxes</h3>
        <ul className="list-disc list-inside">
          {hitboxes.map((hitbox, index) => (
            <li key={index}>{hitbox}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DebugInfo;
