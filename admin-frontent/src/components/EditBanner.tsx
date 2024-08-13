import { useState } from "react";
import TimeComponent from "./TimeComponent";
import axios from "axios";
import {URL} from "../../../config";

export default function EditBanner({
  setEditing,
  link,
  description,
  startTime,
  id,
}: {
  setEditing: (a: boolean) => void;
  link: string;
  description: string;
  startTime: Date;
  id: number;
}) {
  const [l, setL] = useState(link);
  const [d, setD] = useState(description);
  const t1 = startTime.getTime();
  const t2 = new Date().getTime();
  const milliDiff = t1 - t2;
  const totalSeconds = Math.floor(milliDiff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours/24);
  const remSeconds = totalSeconds % 60;
  const remMinutes = totalMinutes % 60;
  const remHours = totalHours%24;

  const [day, setDay] = useState(totalDays);
  const [hour, setHour] = useState(remHours);
  const [minute, setMinute] = useState(remMinutes);
  const [second, setSecond] = useState(remSeconds);

  async function f() {
    let time = 0;
    time += second;
    time += minute * 60;
    time += hour * 60 * 60;
    time += day * 60 * 60 * 24;
    const nd = startTime;
    const ndd = new Date(nd.getTime() + time * 1000);
    await axios.patch(URL+"/admin/update", {
      description: d,
      link: l,
      startTime: ndd.toISOString(),
      id: id,
    });
    location.reload();
  }
  return (
    <div className="z-50 flex flex-col items-center w-full h-full md:h-4/5 md:w-2/5  items center bg-black/80 pb-10 pt-5 rounded-lg">
      <div
        className="w-full flex flex-col items-end mr-12 cursor-pointer"
        onClick={() => {
          setEditing(false);
        }}
      >
        <Cross />
      </div>

      <div className="text-2xl font-bold">Edit a banner</div>
      <div className="flex flex-col items-start mt-4 w-full px-2 md:px-10">
        <label className="font-medium">Image Link</label>
        <input
          onChange={(e) => {
            setL(e.target.value);
          }}
          className="z-50 mt-2 py-1 px-3 rounded-md w-full placeholder-white/20"
          type={"url"}
          value={l}
          placeholder="https://www.abc.com/image.png"
        />
      </div>

      <div className="flex flex-col items-start mt-4 w-full px-2 md:px-10">
        <label className="font-medium">Description</label>
        <textarea
          value={d}
          onChange={(e) => {
            setD(e.target.value);
          }}
          className="mt-2 py-2 px-3 rounded-md w-full h-36 flex flex-row items-start placeholder-white/20 resize-none"
          placeholder="Enter banner description..."
        />
      </div>
      <div className="flex flex-col items-start mt-4 w-full px-2 md:px-10">
        <div className="flex flex-row justify-between w-full"><label className="font-medium">Timer</label>
        <label className="text-md font-light text-white/50">
          <a className="font-semibold text-white">Current:</a> {totalDays}d : {remHours}h : {remMinutes}m : {remSeconds}s
        </label></div>
        
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
            setEditing(false);
            f();
          }}
          className="bg-white/10 w-full"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

function Cross() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}
