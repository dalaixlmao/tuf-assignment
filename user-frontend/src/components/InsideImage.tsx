

function InsideImage({link}:{link:string}) {
  return (
    <div
      className="z-0 min-w-48 min-h-36 md:rounded-md"
      style={{
        backgroundImage: `url(${link})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
}


export default InsideImage;