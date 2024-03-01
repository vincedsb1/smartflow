"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
class AuthController {
    static googleAuthCallback(req, res, next) {
        passport_1.default.authenticate("google", { failureRedirect: "/signup" }, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect("/signup");
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect("/today");
            });
        })(req, res, next);
    }
    static googleAuth(req, res, next) {
        passport_1.default.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
    }
}
exports.default = AuthController;
