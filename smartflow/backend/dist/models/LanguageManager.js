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
const AbstractManager_1 = require("./AbstractManager");
const prisma = new client_1.PrismaClient();
class LanguageManager extends AbstractManager_1.AbstractManager {
    constructor() {
        super({ table: "language" });
        this.tableName = "language";
    }
    // Creates a new language record in the database
    create({ code, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.language.create({
                data: { code, name },
            });
        });
    }
    // Retrieves a language record from the database based on the provided id
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const language = yield prisma.language.findUnique({
                where: { id },
            });
            return language || null;
        });
    }
    // Updates a language record in the database based on the provided id
    update({ id, code, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.language.update({
                where: { id },
                data: { code, name },
            });
        });
    }
    // Deletes a language record from the database based on the provided id
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.language.delete({
                where: { id },
            });
        });
    }
}
exports.default = LanguageManager;
