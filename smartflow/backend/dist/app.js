"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorManager_1 = __importDefault(require("./services/errorManager"));
const router_1 = __importDefault(require("./router"));
const auth_1 = __importDefault(require("./auth/auth"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
}));
app.use((0, express_session_1.default)({
    secret: "your session secret",
    resave: false,
    saveUninitialized: false,
})); // Use express-session
app.use(auth_1.default.initialize()); // Initialize Passport.js
app.use(auth_1.default.session()); // Use Passport.js sessions
app.use(router_1.default);
app.use(express_1.default.static("./public"));
app.use(errorManager_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
exports.default = app;
