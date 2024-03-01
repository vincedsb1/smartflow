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
/**
 * Manages the CRUD operations for the "rule" table.
 */
class RuleManager extends AbstractManager_1.AbstractManager {
    // Constructor for RuleManager class
    constructor() {
        super({ table: "rule" });
        this.tableName = "rule"; // Set the tableName here or through constructor parameters
    }
    // Create a new rule
    create({ ruleName: ruleName, description, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.rule.create({
                data: { ruleName, description },
            });
        });
    }
    // Read a rule by its ID
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rule = yield prisma.rule.findUnique({
                where: { id },
            });
            return rule || null;
        });
    }
    // Update a rule
    update({ id, ruleName, description, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.rule.update({
                where: { id },
                data: { ruleName, description },
            });
        });
    }
    // Delete a rule by its ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.rule.delete({
                where: { id },
            });
        });
    }
}
exports.default = RuleManager;
