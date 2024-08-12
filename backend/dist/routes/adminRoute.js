"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.adminRoute = (0, express_1.Router)();
exports.adminRoute.patch("/visibilty", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const vis = req.body.visibility;
    try {
        const banner = yield prisma.banner.update({
            where: { id: id },
            data: { visible: vis },
        });
        res.status(200).json({ message: "visibility changed to " + vis });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}));
exports.adminRoute.get("/banners", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visibleBanners = yield prisma.banner.findMany({
            where: { visible: true },
        });
        const notVisibleBanner = yield prisma.banner.findMany({
            where: { visible: false },
        });
        res.status(200).json({
            visibleBanners: visibleBanners,
            notVisibleBanner: notVisibleBanner,
        });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}));
exports.adminRoute.patch("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = {
        link: req.body.link,
        description: req.body.description,
        startTime: new Date(req.body.startTime)
    };
    try {
        const banner = yield prisma.banner.update({
            where: { id: req.body.id },
            data: body,
        });
        res.status(200).json({
            message: "banner updated",
            banner: banner,
        });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}));
exports.adminRoute.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, day, hours, minutes, seconds, link, visible } = req.body;
    console.log(description, day, hours, minutes, seconds, link, visible);
    const date = new Date();
    let time = date.getTime();
    time += seconds;
    time += minutes * 60;
    time += hours * 60 * 60;
    time += day * 60 * 60 * 24;
    const ndate = new Date(time);
    try {
        const banner = yield prisma.banner.create({
            data: {
                description,
                link,
                startTime: ndate,
                visible,
            },
        });
        res.status(200).json({ message: "New banner added", banner: banner });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}));
