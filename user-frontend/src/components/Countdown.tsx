import { memo, useEffect, useState } from "react";
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
    setT(t1 - t2);
    const nD = new Date(t1 - t2);
    setD(nD.getDate());
    setH(nD.getHours());
    setM(nD.getMinutes());
    setS(nD.getSeconds());
  }, [now, t]);
  return (
    <div className="z-0 flex flex-row justify-between md:ml-10 items-center">
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

export default memo( Countdown);
