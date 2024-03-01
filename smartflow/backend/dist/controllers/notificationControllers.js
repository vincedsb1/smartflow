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
class NotificationController {
    browse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield prisma.notification.findMany();
                res.json(notifications);
            }
            catch (err) {
                next(err);
            }
        });
    }
    read(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield prisma.notification.findUnique({
                    where: { id: Number(req.params.id) },
                });
                if (notification === null) {
                    res.sendStatus(404);
                }
                else {
                    res.json(notification);
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    browseByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = Number(req.params.userId);
                const notifications = yield prisma.notification.findMany({
                    where: { userId: userId },
                });
                res.json(notifications);
            }
            catch (err) {
                next(err);
            }
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = req.body;
            try {
                const createdNotification = yield prisma.notification.create({
                    data: notification,
                });
                res.status(201).json({ insertId: createdNotification.id });
            }
            catch (err) {
                next(err);
            }
        });
    }
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || isNaN(Number(id))) {
                    res.status(400).send({ error: 'Invalid notification ID' });
                    return;
                }
                const response = yield prisma.notification.update({
                    where: { id: parseInt(id) },
                    data: req.body,
                });
                if (response) {
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
                yield prisma.notification.delete({
                    where: { id: Number(req.params.id) },
                });
                res.sendStatus(204);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new NotificationController();
