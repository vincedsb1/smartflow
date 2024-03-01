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
const passport = require("passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
passport.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: "http://localhost:8000/api/auth/callback/google",
    scope: ["profile", "email"],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        if (!profile.emails || profile.emails.length === 0) {
            return done(new Error("No email addresses provided in profile"));
        }
        if (!profile.name ||
            !profile.name.givenName ||
            !profile.name.familyName) {
            return done(new Error("Name and surname missing from profile"));
        }
        const email = profile.emails[0].value;
        let existingUser = null;
        existingUser = yield prisma.user.findFirst({
            where: { email },
        });
        if (!existingUser) {
            existingUser = yield prisma.user.create({
                data: {
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    email,
                    imageUrl: (_c = (_b = (_a = profile.photos) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : "",
                    birthday: "1970-01-01T00:00:00.000Z",
                    password: "",
                    onBoarding: false,
                    language: {
                        create: {
                            code: "fr",
                            name: "French",
                        },
                    },
                },
            });
        }
        existingUser.accessToken = accessToken; // Store the access token in the user object
        return done(null, existingUser);
    }
    catch (error) {
        return done(error);
    }
})));
passport.serializeUser((user, done) => {
    done(null, { id: user.id, accessToken: user.accessToken }); // Serialize user ID and accessToken
});
passport.deserializeUser((user, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retrievedUser = yield prisma.user.findUnique({
            where: { id: user.id },
        });
        if (!retrievedUser) {
            return done(new Error("User not found"));
        }
        const userWithToken = Object.assign(Object.assign({}, retrievedUser), { accessToken: user.accessToken });
        done(null, userWithToken);
    }
    catch (error) {
        done(error);
    }
}));
exports.default = passport;
