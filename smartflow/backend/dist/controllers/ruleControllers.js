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
class RuleController {
    browse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rules = yield prisma.rule.findMany();
                res.json(rules);
            }
            catch (err) {
                next(err);
            }
        });
    }
    read(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rule = yield prisma.rule.findUnique({
                    where: { id: parseInt(req.params.id) },
                });
                if (rule === null) {
                    res.sendStatus(404);
                }
                else {
                    res.json(rule);
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const rule = req.body;
            try {
                const createdRule = yield prisma.rule.create({ data: rule });
                res.status(201).json({ insertId: createdRule.id });
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
                const { ruleName, description } = req.body;
                if (!id || isNaN(parseInt(id))) {
                    res.status(400).send({ error: 'Invalid rule ID' });
                    return;
                }
                const updatedRule = yield prisma.rule.update({
                    where: { id: parseInt(id) },
                    data: { ruleName, description },
                });
                if (updatedRule) {
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
                yield prisma.rule.delete({
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
exports.default = new RuleController();
