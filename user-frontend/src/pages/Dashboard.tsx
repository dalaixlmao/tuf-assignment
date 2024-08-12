import { useEffect, useState } from "react"
import Banner from "../components/Banner"
import axios from "axios"

export default function Dashboard(){
    const [banners, setBanners] = useState<any>();
    const [set, setSet] = useState(0);
    useEffect(()=>{
        async function f()
        {const res = await axios.get('http://localhost:8000/user/banners');
        setBanners(res.data.banners);}
        f();
    }, [set])
    return <div className="w-full h-full flex-col flex items-center">
        <div className="text-4xl font-bold mt-2 border-b border-b-white/10 w-full text-center pb-5">Banners</div>
        {banners?banners.length==0?"No banners available":banners?.map((elem:any)=>{
          return <Banner key={elem.id} startTime={new Date(elem.startTime)} description={elem.description} link={elem.link}/>
        }):"No banners available"}
    </div>

}