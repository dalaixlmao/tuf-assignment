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
exports.userRoute = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const prisma = new client_1.PrismaClient();
exports.userRoute = (0, express_1.Router)();
exports.userRoute.get("/banners", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banners = yield prisma.banner.findMany({
            where: { visible: true },
            select: { link: true, description: true, startTime: true },
        });
        res.status(200).json({ banners: banners });
    }
    catch (e) {
        res.status(404).json({ message: e.message });
    }
}));
