
import Countdown from "./Countdown";
import InsideImage from "./InsideImage";

function Banner({
  link,
  description,
  startTime
}: {
  link: string;
  description: string;
  startTime: Date;
}) {
  return (
    <div
      className="md:w-3/5 w-full md:rounded-lg md:h-2/5 flex flex-col items-center shadow-inner shadow-[inset_10px_-2px_4px_rgba(0,0,0,0)] mt-5"
      style={{
        backgroundImage: `url(${link})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 5px 5px 50px 10px rgba(0, 0, 0, 0.7)",
      }}
    >
      <div className="flex h-full md:rounded-lg md:flex-row flex-col justify-between w-full backdrop-blur-md md:backdrop-blur-none backdrop-saturate-0 bg-black/80 md:p-4">
        <InsideImage link={link} />
        <div className="h-full w-full flex-col">
          <div className="w-full flex flex-col h-full justify-center items-center md:pl-10 px-3">
            <div className="flex flex-col md:items-start items-center">
              <div className="text-xl font-bold md:mt-0 mt-3">Description</div>
            <div className="w-full text-sm font-light text-justify h-full flex flex-row md:items-start items-center">{description}</div>
              
            </div>
            <div className="text-xl font-bold mt-4">Time Left</div>
            <Countdown date={startTime} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
