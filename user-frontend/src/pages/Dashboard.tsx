import { useEffect, useState } from "react"
import Banner from "../components/Banner"
import axios from "axios"
import {URL} from "../../../config";

export default function Dashboard(){
    const [banners, setBanners] = useState<any>();
    const set=0;
    useEffect(()=>{
        async function f()
        {const res = await axios.get(URL+'/user/banners');
        setBanners(res.data.banners);}
        f();
    }, [set])
    return <div className="w-full h-full flex-col flex items-center">
        <div className="text-4xl font-bold mt-2 border-b border-b-white/10 w-full text-center pb-5">Banners</div>
        {banners?banners.length==0?"No banners available":banners?.map((elem:any, index:number)=>{
          return <Banner key={index} startTime={new Date(elem.startTime)} description={elem.description} link={elem.link}/>
        }):"No banners available"}
    </div>

}