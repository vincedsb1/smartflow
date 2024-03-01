import passport = require("passport");
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
import { User as PrismaUser } from "@prisma/client";

interface User extends PrismaUser {
  accessToken?: string;
}

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface User {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      imageUrl?: string;
      accessToken?: string; // Add accessToken to the User interface
    }
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "http://localhost:8000/api/auth/callback/google",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.emails || profile.emails.length === 0) {
          return done(new Error("No email addresses provided in profile"));
        }

        if (
          !profile.name ||
          !profile.name.givenName ||
          !profile.name.familyName
        ) {
          return done(new Error("Name and surname missing from profile"));
        }

        const email = profile.emails[0].value;

        let existingUser: Express.User | null = null;
        existingUser = await prisma.user.findFirst({
          where: { email },
        });

        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              email,
              imageUrl: profile.photos?.[0]?.value ?? "",
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
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

declare global {
  namespace Express {
    interface User {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      imageUrl?: string;
      accessToken?: string; // Add accessToken to the User interface
    }
  }
}

passport.serializeUser((user: Express.User, done) => {
  done(null, { id: user.id, accessToken: user.accessToken }); // Serialize user ID and accessToken
});

passport.deserializeUser(
  async (user: { id: number; accessToken?: string }, done) => {
    try {
      const retrievedUser = await prisma.user.findUnique({
        where: { id: user.id },
      });
      if (!retrievedUser) {
        return done(new Error("User not found"));
      }

      const userWithToken: Express.User = {
        ...retrievedUser,
        accessToken: user.accessToken, // Restore the access token from the session
      };

      done(null, userWithToken);
    } catch (error) {
      done(error);
    }
  }
);

export default passport;
