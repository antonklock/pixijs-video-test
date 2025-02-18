const Nav = () => {
  return (
    <div
      className="absolute top-0 left-0 flex w-full items-center justify-center flex-row z-40"
      style={{ zIndex: 101 }}
    >
      <div className="flex flex-row items-center justify-center mt-4 gap-4">
        <p
          className="text-white hover:underline cursor-pointer"
          onClick={() => window.open("https://www.yebanishedprivateers.com/")}
        >
          Ye Banished Privateers
        </p>
        <p
          className="text-white hover:underline cursor-pointer"
          onClick={() =>
            window.open(
              "https://ye-banished-privateers-treasure-chest.myshopify.com/",
              "_blank"
            )
          }
        >
          Store
        </p>
        <p
          className="text-white hover:underline cursor-pointer"
          onClick={() => window.open("/credits")}
        >
          Credits
        </p>
      </div>
    </div>
  );
};

export default Nav;
