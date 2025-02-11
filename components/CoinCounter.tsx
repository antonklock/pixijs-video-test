import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

const CoinCounter = () => {
  const { coins } = useGameGlobalsStore();

  return (
    <p className="text-white text-2xl font-bold absolute bottom-10 right-10">
      Coins: {coins}
    </p>
  );
};

export default CoinCounter;
