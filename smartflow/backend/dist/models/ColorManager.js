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
class ColorManager {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    // Creates a new color record in the database
    create({ color_name: colorName }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.color.create({ data: { name: colorName } });
        });
    }
    // Retrieves a color record from the database based on its ID
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.color.findUnique({ where: { id } });
        });
    }
    // Updates a color record in the database based on its ID
    update({ id, color_name: colorName }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.color.update({
                where: { id },
                data: { name: colorName },
            });
        });
    }
    // Deletes a color record from the database based on its ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.color.delete({ where: { id } });
        });
    }
}
exports.default = ColorManager;
