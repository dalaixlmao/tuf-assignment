import { memo, useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import AddBanner from "../components/AddBanner";
import Banner from "../components/Banner";
import axios from "axios";
import VisibilityBar from "../components/VisibilityBar";
function Dashboard() {
  const [creating, setCreating] = useState(false);
  const [visible, setVisible] = useState(true);
  const [visibleBanners, setVisibleBanners] = useState<
    {
      id: number;
      startTime: Date;
      link: string;
      description: string;
      visible: boolean;
    }[]
  >();
  const [notVisibleBanners, setNotVisibleBanners] = useState<
    {
      id: number;
      startTime: Date;
      link: string;
      description: string;
      visible: boolean;
    }[]
  >();
  useEffect(() => {
    async function f() {
      const res = await axios.get("http://localhost:8000/admin/banners");
      setVisibleBanners(res.data.visibleBanners);
      setNotVisibleBanners(res.data.notVisibleBanner);
    }
    f();
  }, [creating, visible]);
  return (
    <div className="w-screen h-screen">
      {creating ? (
        <div className="z-50 absolute flex flex-col items-center justify-center backdrop-blur-md w-screen h-screen bg-black/50">
          <AddBanner setCreating={setCreating} />
        </div>
      ) : (
        <></>
      )}

      <div className="w-full flex flex-col items-center pt-8">
        <AddButton createNew={setCreating} />
      </div>
      <VisibilityBar visible={visible} setVisible={setVisible} />
      <div className="w-full flex flex-col items-center mt-10">

        {visible? visibleBanners?.length===0?"No banners available":visibleBanners?.map((elem)=>{
          return <Banner key={elem.id} id={elem.id} startTime={new Date(elem.startTime)} description={elem.description} link={elem.link} visible={elem.visible}/>
        }): notVisibleBanners?.length===0?"No banners available":notVisibleBanners?.map((elem)=>{
          return <Banner key={elem.id} id={elem.id} startTime={new Date(elem.startTime)} description={elem.description} link={elem.link} visible={elem.visible}/>
        }) }
      </div>
    </div>
  );
}

export default memo(Dashboard)


