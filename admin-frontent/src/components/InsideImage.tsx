

function InsideImage({link}:{link:string}) {
  return (
    <div
      className="z-0 w-full h-48 md:min-w-72 md:w-72 md:min-h-48 md:rounded-md"
      style={{
        backgroundImage: `url(${link})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
}


export default InsideImage;