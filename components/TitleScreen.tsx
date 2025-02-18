import PlayGame from "./PlayThumbImg";

const TitleScreen = (props: {
  handleStartGame: () => void;
  isFading: boolean;
  bgColor: string;
  isGameRunning: boolean;
}) => {
  const { handleStartGame, isFading, bgColor, isGameRunning } = props;

  return (
    <div
      className={`w-full h-auto flex items-center flex-col justify-center ${bgColor} transition-colors duration-500 ${
        isGameRunning ? "-z-50" : "z-50"
      }`}
    >
      {!isGameRunning && (
        <PlayGame
          onClick={handleStartGame}
          className={`transition-opacity duration-500 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
    </div>
  );
};

export default TitleScreen;
