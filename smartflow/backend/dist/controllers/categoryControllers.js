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
class CategoryController {
    browse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield prisma.category.findMany();
                res.json(categories);
            }
            catch (err) {
                next(err);
            }
        });
    }
    read(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield prisma.category.findUnique({
                    where: { id: Number(req.params.id) },
                });
                if (category === null) {
                    res.sendStatus(404);
                }
                else {
                    res.json(category);
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = req.body;
            try {
                const createdCategory = yield prisma.category.create({ data: category });
                res.status(201).json({ insertId: createdCategory.id });
            }
            catch (err) {
                next(err);
            }
        });
    }
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = req.body;
            try {
                const updatedCategory = yield prisma.category.update({
                    where: { id: Number(req.params.id) },
                    data: category,
                });
                res.json(updatedCategory);
            }
            catch (err) {
                next(err);
            }
        });
    }
    destroy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.category.delete({ where: { id: Number(req.params.id) } });
                res.sendStatus(204);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new CategoryController();
