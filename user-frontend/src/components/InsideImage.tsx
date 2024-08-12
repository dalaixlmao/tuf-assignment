

function InsideImage({link}:{link:string}) {
  return (
    <div
      className="z-0 min-w-48 min-h-36 md:rounded-md"
      style={{
        backgroundImage: `url(${link})`,
        backgroundSize: "cover", // Adjust this to 'contain' or 'auto' based on your requirement
        backgroundPosition: "center",
      }}
    ></div>
  );
}


export default InsideImage;