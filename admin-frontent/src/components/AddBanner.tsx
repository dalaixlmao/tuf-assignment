import { useState } from "react";
import TimeComponent from "./TimeComponent";
import axios from "axios";
import {URL} from "../../../config";

export default function AddBanner({
  setCreating,
}: {
  setCreating: (a: boolean) => void;
}) {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  // const [time, setTime] = useState({
  //   day: 0,
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [fetchNow, setFetchNow] = useState(0);

    async function f() {
       await axios.post(URL+"/admin/create", {
        description: description,
        link: link,
        day: day,
        hours: hour,
        minutes: minute,
        seconds: second,
        visible: true,
      });
location.reload();
      // { description, day, hours, minutes, seconds, link, visible }
    }
// https://drive.google.com/drive-viewer/AKGpihYanwyseTH2ee_Ag2x1PErCfUW4Eqyd7R0SuD03PcRmoijTcuHjdg30xvojB_oWjTYIc4SRveThHXX6GkxnQlZL3d8SGPjNHEs=s1600-rw-v1
  return (<div className={"z-60 flex flex-col items-center w-full h-full md:w-2/5 md:h-4/5  items center bg-black/80 pb-10 pt-5 rounded-lg"}>
      <div className="w-full flex flex-col items-end mr-12 cursor-pointer" onClick={()=>{setCreating(false)}}><Cross /></div>
      <div className="text-2xl font-bold">Add a banner</div>
      <div className="flex flex-col items-start mt-4 w-full px-2 md:px-10">
        <label className="font-medium">Image Link</label>
        <input
          onChange={(e) => {
            setLink(e.target.value);
          }}
          className="z-50 mt-2 py-1 px-3 rounded-md w-full placeholder-white/20"
          type={"url"}
          placeholder="https://www.abc.com/image.png"
        />
      </div>

      <div className="flex flex-col items-start mt-4 w-full px-2 md:px-10">
        <label className="font-medium">Description</label>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="mt-2 py-2 px-3 rounded-md w-full h-36 flex flex-row items-start placeholder-white/20 resize-none"
          placeholder="Enter banner description..."
        />
      </div>
      <div className="flex flex-col items-start mt-4 w-full px-2 md:px-10">
        <label className="font-medium">Timer</label>
        <div className="flex flex-row justify-between w-full mt-4">
          <TimeComponent type={"days"} setTime={setDay} />
          <TimeComponent type={"hours"} setTime={setHour} />
          <TimeComponent type={"minutes"} setTime={setMinute} />
          <TimeComponent type={"seconds"} setTime={setSecond} />
        </div>
      </div>

      <div className="flex flex-col items-start mt-4 w-full px-2 md:px-10">
        <button
          onClick={() => {
            setFetchNow(fetchNow+1);
            setCreating(false);
            // setTime({
            //   day: day,
            //   hours: hour,
            //   minutes: minute,
            //   seconds: second,
            // });
            f();
          }}
          className="bg-white/10 w-full"
        >
          Create Banner
        </button>
      </div>
    </div>
  );
}

function Cross(){
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

}
