import { PrismaClient } from "@prisma/client";
import { Router } from "express";


const prisma = new PrismaClient();

export const userRoute = Router();

userRoute.get('/banners', async (req, res)=>{
    try{
        const banners = await prisma.banner.findMany({where:{visible:true}});
        res.status(200).json({banners:banners});
    }catch(e:any){
        res.status(404).json({message:e.message});
    }
})