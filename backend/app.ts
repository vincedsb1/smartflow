import express, { Request, Response, Express } from "express";
import * as path from "path";
import cors from "cors";
import errorManager from "./services/errorManager";
import router from "./router";
import passport from "./auth/auth";
import session from "express-session";

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
  })
);

app.use(
  session({
    secret: "your session secret",
    resave: false,
    saveUninitialized: false,
  })
); // Use express-session
app.use(passport.initialize()); // Initialize Passport.js
app.use(passport.session()); // Use Passport.js sessions

app.use(router);

app.use(express.static("./public"));

app.use(errorManager);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
