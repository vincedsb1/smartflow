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
class CardController {
    browse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cards = yield prisma.card.findMany();
                res.json(cards);
            }
            catch (err) {
                next(err);
            }
        });
    }
    read(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const card = yield prisma.card.findUnique({
                    where: { id: parseInt(req.params.id) },
                });
                if (card === null) {
                    res.sendStatus(404);
                }
                else {
                    res.json(card);
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const card = req.body;
            try {
                const createdCard = yield prisma.card.create({ data: card });
                res.status(201).json({ insertId: createdCard.id });
            }
            catch (err) {
                next(err);
            }
        });
    }
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, answer } = req.body;
                const updatedCard = yield prisma.card.update({
                    where: { id: parseInt(req.params.id) },
                    data: { title, answer },
                });
                if (updatedCard) {
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
            const cardId = parseInt(req.params.id);
            try {
                // Supprimer toutes les notifications associées à la carte
                yield prisma.notification.deleteMany({
                    where: { cardId },
                });
                // Supprimer la carte
                yield prisma.card.delete({
                    where: { id: cardId },
                });
                res.sendStatus(204);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new CardController();
