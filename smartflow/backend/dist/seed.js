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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2_1 = __importDefault(require("argon2"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting seeding process...");
        const language = yield prisma.language.create({
            data: {
                code: "FR",
                name: "French",
            },
        });
        console.log("Language created:", language);
        const color = yield prisma.color.create({
            data: {
                name: "Red",
            },
        });
        console.log("Color created:", color);
        const category = yield prisma.category.create({
            data: {
                name: "General",
                color: {
                    connect: {
                        id: color.id,
                    },
                },
            },
        });
        console.log("Category created:", category);
        const rule = yield prisma.rule.create({
            data: {
                ruleName: "Rule 1",
                description: "Description 1",
            },
        });
        console.log("Rule created:", rule);
        const usersData = [
            {
                firstname: "Alice",
                lastname: "Dupont",
                email: "alice@prisma.io",
            },
            {
                firstname: "Bob",
                lastname: "Martin",
                email: "bob@prisma.io",
            },
            {
                firstname: "Charlie",
                lastname: "Johnson",
                email: "charlie@prisma.io",
            },
        ];
        for (const userData of usersData) {
            console.log("Inserting user data:", userData);
            try {
                const user = yield prisma.user.create({
                    data: Object.assign(Object.assign({}, userData), { birthday: new Date(), password: yield argon2_1.default.hash("password"), onBoarding: true, imageUrl: "https://example.com/image.jpg", language: {
                            connect: {
                                id: language.id,
                            },
                        } }),
                });
                console.log("User created:", user);
                const card = yield prisma.card.create({
                    data: {
                        title: `Card for ${user.firstname}`,
                        answer: `Answer for ${user.firstname}`,
                        level: 1,
                        lastReviewDate: new Date(),
                        user: {
                            connect: {
                                id: user.id,
                            },
                        },
                        category: {
                            connect: {
                                id: category.id,
                            },
                        },
                    },
                });
                console.log("Card created for user:", card);
                const notificationsData = [
                    {
                        content: "Notification for Bob",
                        time: new Date("2024-02-21T10:33:11.607Z"),
                        notificationTime: new Date("2024-02-21T10:33:11.607Z"),
                        userId: 6,
                        cardId: 4,
                    },
                ];
                for (const notificationData of notificationsData) {
                    const notification = yield prisma.notification.create({
                        data: notificationData,
                    });
                    console.log("Notification created:", notification);
                }
            }
            catch (e) {
                console.error("Error inserting user data:", userData, e);
            }
        }
        console.log("Seeding finished.");
    });
}
main()
    .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
