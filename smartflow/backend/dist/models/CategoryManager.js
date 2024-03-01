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
class CategoryManager extends AbstractManager_1.AbstractManager {
    constructor() {
        super({ table: "category" });
        this.tableName = "category";
    }
    // Create a new category
    create({ name, colorId }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.category.create({
                data: {
                    name: name,
                    colorId: colorId,
                },
            });
        });
    }
    // Read a category by its ID
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield prisma.category.findUnique({
                where: { id },
            });
            if (!category) {
                return null;
            }
            const categoryManager = new CategoryManager();
            categoryManager.id = category.id;
            categoryManager.name = category.name;
            categoryManager.colorId = category.colorId;
            return categoryManager;
        });
    }
    // Update a category
    update({ id, name, colorId }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.category.update({
                where: { id },
                data: {
                    name: name,
                    colorId: colorId,
                },
            });
        });
    }
    // Delete a category by its ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.category.delete({
                where: { id },
            });
        });
    }
}
exports.default = CategoryManager;
