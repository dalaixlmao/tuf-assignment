import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";
const prisma = new PrismaClient();
export const adminRoute = Router();

adminRoute.patch("/visibilty", async (req, res) => {
  const id: number = req.body.id;
  const vis: boolean = req.body.visibility;
  try {
    const banner = await prisma.banner.update({
      where: { id: id },
      data: { visible: vis },
    });
    res.status(200).json({ message: "visibility changed to " + vis });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

adminRoute.get("/banners", async (req, res) => {
  try {
    const visibleBanners = await prisma.banner.findMany({
      where: { visible: true },
    });
    const notVisibleBanner = await prisma.banner.findMany({
      where: { visible: false },
    });
    res.status(200).json({
      visibleBanners: visibleBanners,
      notVisibleBanner: notVisibleBanner,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

adminRoute.patch("/update", async (req, res) => {
  const body = {
    link:req.body.link,
    description:req.body.description,
    startTime: new Date(req.body.startTime)
  }
  try {
    const banner = await prisma.banner.update({
      where: { id: req.body.id },
      data: body,
    });
    res.status(200).json({
      message: "banner updated",
      banner: banner,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});


adminRoute.post("/create", async (req, res) => {
  const { description, day, hours, minutes, seconds, link, visible } = req.body;
  console.log(description, day, hours, minutes, seconds, link, visible);
  const date = new Date();
  let time = date.getTime();
  time += seconds;
  time += minutes * 60;
  time += hours * 60 * 60;
  time += day * 60 * 60 * 24;
  const ndate = new Date(time*1000);
  try {
    const banner = await prisma.banner.create({
      data: {
        description,
        link,
        startTime: ndate,
        visible,
      },
    });
    res.status(200).json({ message: "New banner added", banner: banner });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
