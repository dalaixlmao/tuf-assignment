import { useState } from "react";
import AddButton from "../components/AddButton";
import AddBanner from "../components/AddBanner";
export default function Dashboard() {
  const [creating, setCreating] = useState(false);
  return (
    <div className="w-screen h-screen">
      {creating ? (
        <div className="absolute flex flex-col items-center justify-center backdrop-blur-md w-screen h-screen bg-black/50">
          <AddBanner
            setCreating={setCreating}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="w-full flex flex-col items-center pt-8">
        <AddButton createNew={setCreating} />
      </div>
    </div>
  );
}
