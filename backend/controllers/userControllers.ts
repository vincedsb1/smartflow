import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
  async browse(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(req.params.id) },
      });
      if (user === null) {
        res.sendStatus(404);
      } else {
        res.json(user);
      }
    } catch (err) {
      next(err);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    try {
      const createdUser = await prisma.user.create({ data: user });
      res.status(201).json({ insertId: createdUser.id });
    } catch (err) {
      next(err);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(req.params.id) },
      });

      if (user !== null && user.id !== Number(req.params.id)) {
        res.status(400).send("Email already exists");
      } else {
        const updatedUser = await prisma.user.update({
          where: { id: Number(req.params.id) },
          data: req.body,
        });

        if (updatedUser) {
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      }
    } catch (err) {
      next(err);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.user.delete({
        where: { id: Number(req.params.id) },
      });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
