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
const AbstractManager_1 = require("./AbstractManager");
class CardManager extends AbstractManager_1.AbstractManager {
    constructor() {
        super({ table: "card" });
    }
    // Create a new card
    create(card) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.card.create({ data: card });
        });
    }
    // Retrieves a card by ID
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.card.findUnique({ where: { id } });
        });
    }
    //Updates a card's information
    update(card) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!card.id)
                throw new Error("ID is required to update a card.");
            return this.prisma.card.update({ where: { id: card.id }, data: card });
        });
    }
    // Deletes a card by ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.card.delete({ where: { id } });
        });
    }
}
exports.default = CardManager;
