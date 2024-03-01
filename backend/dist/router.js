"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
// Importing the controller for the API
const cardControllers_1 = __importDefault(require("./controllers/cardControllers"));
const categoryControllers_1 = __importDefault(require("./controllers/categoryControllers"));
const colorControllers_1 = __importDefault(require("./controllers/colorControllers"));
const languageControllers_1 = __importDefault(require("./controllers/languageControllers"));
const notificationControllers_1 = __importDefault(require("./controllers/notificationControllers"));
const ruleControllers_1 = __importDefault(require("./controllers/ruleControllers"));
const userControllers_1 = __importDefault(require("./controllers/userControllers"));
const authControllers_1 = __importDefault(require("./controllers/authControllers"));
//Routes Auth
router.get("/api/auth/callback/google", passport_1.default.authenticate("google", { failureRedirect: "/signup" }), authControllers_1.default.googleAuthCallback);
router.get("/api/auth/google", authControllers_1.default.googleAuth);
//Routes card
router.get("/cards", cardControllers_1.default.browse); // test OK
router.get("/cards/:id", cardControllers_1.default.read); // test OK
router.post("/cards", cardControllers_1.default.add); // test OK
router.put("/cards/:id", cardControllers_1.default.edit); // test OK
router.delete("/cards/:id", cardControllers_1.default.destroy); // test OK
//Routes Category
router.get("/categories", categoryControllers_1.default.browse); // test OK
router.get("/categories/:id", categoryControllers_1.default.read); // test OK
router.post("/categories", categoryControllers_1.default.add); // test OK
router.put("/categories/:id", categoryControllers_1.default.edit); // test OK
router.delete("/categories/:id", categoryControllers_1.default.destroy); // test OK
//Routes Color
router.get("/colors", colorControllers_1.default.browse); // test OK
router.get("/colors/:id", colorControllers_1.default.read); // test OK
router.post("/colors", colorControllers_1.default.add); // test OK
router.put("/colors/:id", colorControllers_1.default.edit); // test OK
router.delete("/colors/:id", colorControllers_1.default.destroy); /// test OK
//Routes Language
router.get("/languages", languageControllers_1.default.browse); // test OK
router.get("/languages/:id", languageControllers_1.default.read); // test OK
router.post("/languages", languageControllers_1.default.add); // test OK
router.put("/languages/:id", languageControllers_1.default.edit); // test OK
router.delete("/languages/:id", languageControllers_1.default.destroy); // test OK
//Routes Notification
router.get("/notifications", notificationControllers_1.default.browse); // test OK
router.get("/notifications/:id", notificationControllers_1.default.read); // test OK
router.get("/user/:userId", notificationControllers_1.default.browseByUser); // test OK
router.post("/notifications", notificationControllers_1.default.add); // test OK
router.put("/notifications/:id", notificationControllers_1.default.edit); // test OK
router.delete("/notifications/:id", notificationControllers_1.default.destroy); // test OK
//Routes Rule
router.get("/rules", ruleControllers_1.default.browse); // test OK
router.get("/rules/:id", ruleControllers_1.default.read); // test OK
router.post("/rules", ruleControllers_1.default.add); // test OK
router.put("/rules/:id", ruleControllers_1.default.edit); // test OK
router.delete("/rules/:id", ruleControllers_1.default.destroy); // test OK
//Routes User
router.get("/users", userControllers_1.default.browse); // test OK
router.get("/users/:id", userControllers_1.default.read); // test OK
router.post("/users", userControllers_1.default.add); // test OK
router.put("/users/:id", userControllers_1.default.edit); // test OK
router.delete("/users/:id", userControllers_1.default.destroy); // **** A verifier ***
exports.default = router;
