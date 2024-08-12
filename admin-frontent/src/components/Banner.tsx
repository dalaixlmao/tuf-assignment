import {useEffect, useState } from "react";
import Countdown from "./Countdown";
import AdminOnly from "./AdminOnly";
import InsideImage from "./InsideImage";
import axios from "axios";
import EditBanner from "./EditBanner";
import {URL} from "../../../config";

function Banner({
  link,
  description,
  visible,
  startTime,
  id,
}: {
  link: string;
  description: string;
  visible: boolean;
  startTime: Date;
  id: number;
}) {
  const [vis, setVis] = useState(visible);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    async function f() {
      await axios.patch(URL+"/admin/visibilty", {
        id: id,
        visibility: vis,
      });
    }
    f();
  }, [vis]);
  return (
    <div
      className="z-60 md:w-4/5 w-full h-3/5 flex mb-3 md:rounded-xl flex-col items-center shadow-inner shadow-[inset_10px_-2px_4px_rgba(0,0,0,0)]"
      style={{
        backgroundImage: `url(${link})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 5px 5px 50px 10px rgba(0, 0, 0, 0.7)",
      }}
    >

        
        {editing? (
        <div className="z-50 md:top-0 h-full h-fit absolute flex flex-col items-center justify-center backdrop-blur-md w-screen md:h-screen bg-black/40">
          <EditBanner setEditing={setEditing} link={link} description={description} id={id} startTime={startTime} />
        </div>
      ) : (
        <></>
      )}
      <div className="flex h-full md:rounded-xl flex-col items-center md:flex-row md:items-start md:justify-between w-full backdrop-blur-md md:backdrop-blur-none backdrop-saturate-0 bg-black/80 md:p-4">
        <InsideImage link={link} />
        <div className="h-full w-full flex-col items-center">
          <AdminOnly visible={vis} setVisible={setVis} editing={setEditing} />
          <div className="w-full flex flex-col items-center md:items-start">
            <div className="md:w-4/5 px-3 text-justify text-xs font-light py-4 md:px-10 text-justify h-full flex flex-row items-center">
              {description}
            </div>
            <Countdown date={startTime} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
