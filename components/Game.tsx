import VideoSwitcher from "./VideoSwitcher";
import SceneLoadingIndicators from "./SceneLoadingIndicators";
import useGameGlobalsStore from "@/stores/gameGlobals";

export default function Game() {
  const gameGlobals = useGameGlobalsStore();

  return (
    <div className="w-full h-full">
      <SceneLoadingIndicators />
      <VideoSwitcher />
      <div className="flex flex-row gap-2 bg-blue-500 text-white rounded z-10">
        <button
          onClick={async () => {
            gameGlobals.addNewScene("G0");
            gameGlobals.addNewScene("H0");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded z-10"
        >
          {"Load G0"}
        </button>
        <button
          onClick={() => gameGlobals.playScene("G0")}
          className="px-4 py-2 bg-blue-500 text-white rounded z-10"
        >
          {"Play G0"}
        </button>
        <button
          onClick={() => gameGlobals.playScene("H0")}
          className="px-4 py-2 bg-blue-500 text-white rounded z-10"
        >
          {"Play H0"}
        </button>
      </div>
    </div>
  );
}
