import { Request, Response, NextFunction } from "express";
import passport from "passport";

class AuthController {
  static googleAuthCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "google",
      { failureRedirect: "/signup" },
      function (err, user, info) {
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
      }
    )(req, res, next);
  }

  static googleAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }
}

export default AuthController;
