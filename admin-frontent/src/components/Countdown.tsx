import { useEffect, useState } from "react";
import TimerBox from "./TimerBox";

function Countdown({ date }: { date: Date }) {
  const [now, setNow] = useState(new Date());
  const [t, setT] = useState(0);
  const [d, setD] = useState(0);
  const [h, setH] = useState(0);
  const [m, setM] = useState(0);
  const [s, setS] = useState(0);
  useEffect(() => {
    const t1 = date.getTime();
    const t2 = now.getTime();
    setTimeout(() => {
      setNow(new Date());
    }, 1000);
    
    const milliDiff = (t1-t2);
    setT(t1 - t2);
    const totalSeconds = Math.floor(milliDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours/24);
    const remSeconds = totalSeconds % 60;
    const remMinutes = totalMinutes % 60;
    const remHours = totalHours%24;
    setD(totalDays);
    setH(remHours);
    setM(remMinutes);
    setS(remSeconds);
  }, [now, t]);
  return (
    <div className="z-0 flex flex-row md:ml-10 items-center">
      <TimerBox content={d + "d"} />
      <div className="text-6xl font-light mr-2 mb-4">:</div>
      <TimerBox content={h + "h"} />
      <div className="text-6xl font-light mr-2 mb-4">:</div>
      <TimerBox content={m + "m"} />
      <div className="text-6xl font-light mr-2 mb-4">:</div>
      <TimerBox content={s + "s"} />
    </div>
  );
}

export default Countdown;
