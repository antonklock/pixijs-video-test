import React from "react";
import useGameSessionStore from "@/stores/gameSession/gameSession";

const SessionVisualizer: React.FC = () => {
  const { session } = useGameSessionStore();
  const totalDuration = session.reduce((total, entry) => {
    const duration = entry.timeEnded
      ? entry.timeEnded.getTime() - entry.timeStarted.getTime()
      : 1000; // Default small duration if timeEnd is not available
    return total + duration;
  }, 0);

  return (
    <div className="w-full h-20 bg-gray-800 relative">
      <h2 className="text-white text-lg font-bold absolute top-0 left-0 p-2">
        Game Session Timeline
      </h2>
      <div className="flex items-center h-full">
        {session.map((entry, index) => {
          const duration = entry.timeEnded
            ? entry.timeEnded.getTime() - entry.timeStarted.getTime()
            : 1000;
          const widthPercentage = (duration / totalDuration) * 100;
          const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`;

          return (
            <div key={index} className="relative flex-1">
              <div
                className="h-2"
                style={{
                  width: `${widthPercentage}%`,
                  backgroundColor: randomColor,
                  position: "absolute",
                  left: `${(100 / session.length) * index}%`,
                }}
              />
              <div className="absolute top-2 left-0 transform -translate-x-1/2 text-white text-sm">
                {entry.scene.id} - {entry.timeStarted.toLocaleTimeString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SessionVisualizer;
