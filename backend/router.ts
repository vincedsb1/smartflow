//API router Here
const express = require("express");

const router = express.Router();

// Importing the controller for the API
import cardControllers from "./controllers/cardControllers";
import categoryControllers from "./controllers/categoryControllers";
import colorControllers from "./controllers/colorControllers";
import languageControllers from "./controllers/languageControllers";
import notificationControllers from "./controllers/notificationControllers";
import ruleControllers from "./controllers/ruleControllers";
import userControllers from "./controllers/userControllers";

//Routes card
router.get("/cards", cardControllers.browse); // test OK
router.get("/cards/:id", cardControllers.read); // test OK
router.post("/cards", cardControllers.add); // test OK
router.put("/cards/:id", cardControllers.edit);// test OK
router.delete("/cards/:id", cardControllers.destroy); // **** A verifier ***

//Routes Category
router.get("/categories", categoryControllers.browse); // test OK
router.get("/categories/:id", categoryControllers.read); // test OK
router.post("/categories", categoryControllers.add); // test OK
router.put("/categories/:id", categoryControllers.edit); // test OK
router.delete("/categories/:id", categoryControllers.destroy); // **** A verifier ***

//Routes Color
router.get("/colors", colorControllers.browse); // test OK
router.get("/colors/:id", colorControllers.read); // test OK
router.post("/colors", colorControllers.add); // test OK
router.put("/colors/:id", colorControllers.edit); // test OK
router.delete("/colors/:id", colorControllers.destroy); /// **** A verifier ***

//Routes Language
router.get("/languages", languageControllers.browse); // test OK
router.get("/languages/:id", languageControllers.read); // test OK
router.post("/languages", languageControllers.add); // test OK
router.put("/languages/:id", languageControllers.edit); // test OK
router.delete("/languages/:id", languageControllers.destroy); // **** A verifier ***

//Routes Notification
router.get("/notifications", notificationControllers.browse); // test OK
router.get("/notifications/:id", notificationControllers.read); // test OK
router.post("/notifications", notificationControllers.add); // test OK
router.put("/notifications/:id", notificationControllers.edit); // test OK
router.delete("/notifications/:id", notificationControllers.destroy); // **** A verifier ***
 
//Routes Rule
router.get("/rules", ruleControllers.browse); // test OK
router.get("/rules/:id", ruleControllers.read); // test OK
router.post("/rules", ruleControllers.add); // test OK
router.put("/rules/:id", ruleControllers.edit); // test OK
router.delete("/rules/:id", ruleControllers.destroy); // **** A verifier ***

//Routes User
router.get("/users", userControllers.browse); // test OK
router.get("/users/:id", userControllers.read); // test OK
router.post("/users", userControllers.add); // test OK
router.put("/users/:id", userControllers.edit); // test OK
router.delete("/users/:id", userControllers.destroy); // **** A verifier ***

export default router;
