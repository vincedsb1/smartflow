"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorManager = (req, res) => {
    res.status(500).send("Internal Server Error");
};
exports.default = errorManager;
