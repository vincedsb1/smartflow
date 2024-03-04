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
class UserController {
    browse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma.user.findMany();
                res.json(users);
            }
            catch (err) {
                next(err);
            }
        });
    }
    read(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findUnique({
                    where: { id: Number(req.params.id) },
                });
                if (user === null) {
                    res.sendStatus(404);
                }
                else {
                    res.json(user);
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            try {
                const createdUser = yield prisma.user.create({ data: user });
                res.status(201).json({ insertId: createdUser.id });
            }
            catch (err) {
                next(err);
            }
        });
    }
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findUnique({
                    where: { id: Number(req.params.id) },
                });
                if (user !== null && user.id !== Number(req.params.id)) {
                    res.status(400).send("Email already exists");
                }
                else {
                    const updatedUser = yield prisma.user.update({
                        where: { id: Number(req.params.id) },
                        data: req.body,
                    });
                    if (updatedUser) {
                        res.sendStatus(200);
                    }
                    else {
                        res.sendStatus(500);
                    }
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    destroy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.id);
            try {
                yield prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                    // Supprimer les cartes liées
                    yield prisma.card.deleteMany({
                        where: { userId: userId },
                    });
                    // Supprimer les notifications liées (si nécessaire)
                    yield prisma.notification.deleteMany({
                        where: { userId: userId },
                    });
                    // Supprimer l'utilisateur
                    yield prisma.user.delete({
                        where: { id: userId },
                    });
                }));
                res.sendStatus(204);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new UserController();
