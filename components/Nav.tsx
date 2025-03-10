const Nav = (props: { isGameRunning: boolean; isFading: boolean }) => {
  const { isFading } = props;
  return (
    <>
      {/* Top centered navigation */}
      <div
        className={`absolute opacity-0 top-0 left-0 w-full flex justify-center z-40 transition-opacity duration-500 ${
          isFading
            ? "opacity-0 -z-50 pointer-events-none"
            : "opacity-100 z-50 pointer-events-auto"
        }`}
        style={{ zIndex: 60 }}
      >
        <div className="flex flex-row items-center mt-4 gap-4">
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
            onClick={() =>
              window.open(
                "https://napalmrecords.com/deutsch/yebanishedprivateers",
                "_blank"
              )
            }
          >
            Album Pre-order
          </p>
        </div>
      </div>

      {/* Bottom right navigation */}
      <div
        className={`absolute opacity-0 bottom-4 right-4 flex z-40 transition-opacity duration-500 ${
          isFading
            ? "opacity-0 -z-50 pointer-events-none"
            : "opacity-100 z-50 pointer-events-auto"
        }`}
        style={{ zIndex: 60 }}
      >
        <div className="flex flex-row gap-4">
          <p
            className="text-white hover:underline cursor-pointer"
            onClick={() => window.open("/help")}
          >
            Help
          </p>
          <p
            className="text-white hover:underline cursor-pointer"
            onClick={() => window.open("/credits")}
          >
            Credits
          </p>
        </div>
      </div>
    </>
  );
};

export default Nav;
