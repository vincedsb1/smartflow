//API router Here
const express = require("express");

const router = express.Router();

// Importing the controller for the API
const cardControllers = require("./controllers/cardControllers");
const categoryControllers = require("./controllers/categoryControllers");
const colorControllers = require("./controllers/colorControllers");
const languageControllers = require("./controllers/languageControllers");
const notificationControllers = require("./controllers/notificationControllers");
const ruleControllers = require("./controllers/ruleControllers");
const userControllers = require("./controllers/userControllers");

//Routes card
router.get("/cards", cardControllers.getAllCards);
router.get("/cards/:id", cardControllers.getCard);
router.post("/cards", cardControllers.createCard);
router.put("/cards/:id", cardControllers.updateCard);
router.delete("/cards/:id", cardControllers.deleteCard);

//Routes Category
router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.post("/categories", categoryControllers.add);
router.put("/categories/:id", categoryControllers.edit);
router.delete("/categories/:id", categoryControllers.destroy);

//Routes Color
router.get("/colors", colorControllers.browse);
router.get("/colors/:id", colorControllers.read);
router.post("/colors", colorControllers.add);
router.put("/colors/:id", colorControllers.edit);
router.delete("/colors/:id", colorControllers.destroy);

//Routes Language
router.get("/languages", languageControllers.browse);
router.get("/languages/:id", languageControllers.read);
router.post("/languages", languageControllers.add);
router.put("/languages/:id", languageControllers.edit);
router.delete("/languages/:id", languageControllers.destroy);
//Routes Notification
router.get("/notifications", notificationControllers.browse);
router.get("/notifications/:id", notificationControllers.read);
router.post("/notifications", notificationControllers.add);
router.put("/notifications/:id", notificationControllers.edit);
router.delete("/notifications/:id", notificationControllers.destroy);
//Routes Rule
router.get("/rules", ruleControllers.browse);
router.get("/rules/:id", ruleControllers.read);
router.post("/rules", ruleControllers.add);
router.put("/rules/:id", ruleControllers.edit);
router.delete("/rules/:id", ruleControllers.destroy);

//Routes User
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", userControllers.add);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

export default router;
