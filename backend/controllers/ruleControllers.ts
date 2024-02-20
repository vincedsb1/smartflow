import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class RuleController {
  async browse(req: Request, res: Response, next: NextFunction) {
    try {
      const rules = await prisma.rule.findMany();
      res.json(rules);
    } catch (err) {
      next(err);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const rule = await prisma.rule.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (rule === null) {
        res.sendStatus(404);
      } else {
        res.json(rule);
      }
    } catch (err) {
      next(err);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const rule = req.body;
    try {
      const createdRule = await prisma.rule.create({ data: rule });
      res.status(201).json({ insertId: createdRule.id });
    } catch (err) {
      next(err);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedRule = await prisma.rule.update({
        where: { id: parseInt(req.body.id) },
        data: req.body,
      });
      if (updatedRule) {
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
      await prisma.rule.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export default new RuleController();
