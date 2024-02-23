import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ColorController {
  async browse(req: Request, res: Response, next: NextFunction) {
    try {
      const colors = await prisma.color.findMany();
      res.json(colors);
    } catch (err) {
      next(err);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const color = await prisma.color.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (color === null) {
        res.sendStatus(404);
      } else {
        res.json(color);
      }
    } catch (err) {
      next(err);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const color = req.body;
    try {
      const createdColor = await prisma.color.create({ data: color });
      res.status(201).json({ insertId: createdColor.id });
    } catch (err) {
      next(err);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedColor = await prisma.color.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      if (updatedColor) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    } catch (err) {
      next(err);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.color.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export default new ColorController();
