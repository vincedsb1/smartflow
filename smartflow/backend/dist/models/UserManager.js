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
// Importing the AbstractManager module
const AbstractManager = require("./AbstractManager");
/**
 * Manages user data in the database.
 */
class UserManager extends AbstractManager {
    constructor() {
        super({ table: "user" });
        this.tableName = "user"; // Set the tableName here or through constructor parameters
    }
    // Creates a new user in the database
    create({ firstname, lastname, birthday, email, onBoarding, imageUrl = null, languageId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = this;
            yield prisma.user.create({
                data: {
                    firstname,
                    lastname,
                    birthday,
                    email,
                    onBoarding,
                    imageUrl: imageUrl || "",
                    languageId: languageId,
                    password,
                },
            });
        });
    }
    // Retrieves a user by their email
    getByMail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findFirst({
                where: { email: email },
            });
            return user || null;
        });
    }
    // Retrieves a user by their ID
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { id },
            });
            return user || null;
        });
    }
    // Updates a user's information
    update({ id, firstname, lastname, birthday, email, onBoarding: onBoarding, imageUrl: imageUrl, languageId: languageId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.update({
                where: { id },
                data: {
                    firstname,
                    lastname,
                    birthday,
                    email,
                    onBoarding,
                    imageUrl: imageUrl || "",
                    languageId,
                },
            });
        });
    }
    // Deletes a user from the database
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.delete({
                where: { id },
            });
        });
    }
    // Uploads an image for a user
    upload(id, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.update({
                where: { id },
                data: { imageUrl },
            });
        });
    }
}
exports.default = UserManager;
