"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path = require("path");
var cors_1 = require("cors");
var errorManager_1 = require("./services/errorManager");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        process.env.FRONTEND_URL,
    ],
}));
app.use(express_1.default.static("./public"));
app.use("/images", express_1.default.static(path.join(__dirname, "images")));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});
app.use(errorManager_1.default);
exports.default = app;
