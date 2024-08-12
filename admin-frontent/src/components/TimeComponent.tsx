import { useEffect, useState } from "react";

export default function TimeComponent({
  type,
  setTime,
}: {
  type: "days" | "hours" | "minutes" | "seconds";
  setTime: (a: number) => void;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTime(count);
  }, [count]);
  const mod = type === "days" ? 100 : type === "hours" ? 24 : 60;
  return (
    <div>
      <div className="flex flex-row">
        <div className="h-10 w-10 border-white/20 border rounded-md flex justify-center items-center mr-2">
          {count}
        </div>
        <div>
          <div
            className="h-4 mb-2 w-4 border-white/20 border rounded-sm flex justify-center items-center cursor-pointer"
            onClick={() => {
              setCount((count + 1) % mod);
              setTime(count);
            }}
          >
            <UpArrow />
          </div>
          <div
            className="h-4 w-4 border-white/20 border rounded-sm flex justify-center items-center cursor-pointer"
            onClick={() => {
              setCount((count + mod - 1) % mod);
              setTime(count);
            }}
          >
            <DownArrow />
          </div>
        </div>
      </div>
      <div className="text-sm text-white/20 text-center">
        {type[0].toUpperCase() + type.substring(1)}
      </div>
    </div>
  );
}

function UpArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
}

function DownArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
