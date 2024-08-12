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
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
exports.adminRoute = (0, express_1.Router)();
exports.adminRoute.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const hashedPass = yield (0, bcrypt_1.hash)(password, 10);
    try {
        const admin = yield prisma.admin.findUnique({
            where: {
                email,
            },
        });
        const jwtPass = process.env.JWT_PASSWORD || "";
        if (admin) {
            const chk = yield (0, bcrypt_1.compare)(hashedPass, admin.password);
            if (chk) {
                const token = (0, jsonwebtoken_1.sign)({ id: admin.id }, jwtPass);
                res
                    .status(200)
                    .json({ message: "Signed in successfully", token: token });
            }
            else {
                res.status(500).json({ message: "false pass" });
            }
        }
        else {
            res.status(403).json({ message: "Auth error" });
        }
    }
    catch (e) {
        res.status(403).json({ message: e.message });
    }
}));
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
exports.adminRoute.patch("/timer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { day, minutes, hours, seconds, id } = req.body;
    const date = new Date();
    let time = date.getTime();
    time += seconds;
    time += minutes * 60;
    time += hours * 60 * 60;
    time += day * 60 * 60 * 24;
    const ndate = new Date(time);
    try {
        const banner = yield prisma.banner.update({
            where: { id: id },
            data: { startTime: ndate },
        });
        res.status(200).json({
            message: "timer updated to " + day + ":" + hours + ":" + minutes + ":" + seconds,
        });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}));
exports.adminRoute.patch("/timer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, id } = req.body;
    try {
        const banner = yield prisma.banner.update({
            where: { id: id },
            data: { link: link },
        });
        res.status(200).json({ message: "link updated to " + link });
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
