import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CategoryController {
  async browse(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await prisma.category.findMany();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await prisma.category.findUnique({
        where: { id: Number(req.params.id) },
      });
      if (category === null) {
        res.sendStatus(404);
      } else {
        res.json(category);
      }
    } catch (err) {
      next(err);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const category = req.body;
    try {
      const createdCategory = await prisma.category.create({ data: category });
      res.status(201).json({ insertId: createdCategory.id });
    } catch (err) {
      next(err);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCategory = await prisma.category.update({
        where: { id: Number(req.body.id) },
        data: req.body,
      });
      if (updatedCategory) {
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
      await prisma.category.delete({ where: { id: Number(req.params.id) } });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export default new CategoryController();
