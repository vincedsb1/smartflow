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
class LanguageController {
    browse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const languages = yield prisma.language.findMany();
                res.json(languages);
            }
            catch (err) {
                next(err);
            }
        });
    }
    read(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = yield prisma.language.findUnique({
                    where: { id: Number(req.params.id) },
                });
                if (language === null) {
                    res.sendStatus(404);
                }
                else {
                    res.json(language);
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const language = req.body;
            try {
                const createdLanguage = yield prisma.language.create({ data: language });
                res.status(201).json({ insertId: createdLanguage.id });
            }
            catch (err) {
                next(err);
            }
        });
    }
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { code, name } = req.body;
            try {
                const updatedLanguage = yield prisma.language.update({
                    where: { id: parseInt(id) },
                    data: { code, name },
                });
                if (updatedLanguage) {
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
                yield prisma.language.delete({ where: { id: Number(req.params.id) } });
                res.sendStatus(204);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new LanguageController();
