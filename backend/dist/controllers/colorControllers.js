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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ColorController {
    browse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const colors = yield prisma.color.findMany();
                res.json(colors);
            }
            catch (err) {
                next(err);
            }
        });
    }
    read(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const color = yield prisma.color.findUnique({
                    where: { id: parseInt(req.params.id) },
                });
                if (color === null) {
                    res.sendStatus(404);
                }
                else {
                    res.json(color);
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const color = req.body;
            try {
                const createdColor = yield prisma.color.create({ data: color });
                res.status(201).json({ insertId: createdColor.id });
            }
            catch (err) {
                next(err);
            }
        });
    }
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedColor = yield prisma.color.update({
                    where: { id: parseInt(req.params.id) },
                    data: req.body,
                });
                if (updatedColor) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(500);
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    destroy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.color.delete({
                    where: { id: parseInt(req.params.id) },
                });
                res.sendStatus(204);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new ColorController();
