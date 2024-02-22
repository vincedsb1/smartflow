import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class LanguageController {
  async browse(req: Request, res: Response, next: NextFunction) {
    try {
      const languages = await prisma.language.findMany();
      res.json(languages);
    } catch (err) {
      next(err);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const language = await prisma.language.findUnique({
        where: { id: Number(req.params.id) },
      });
      if (language === null) {
        res.sendStatus(404);
      } else {
        res.json(language);
      }
    } catch (err) {
      next(err);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const language = req.body;
    try {
      const createdLanguage = await prisma.language.create({ data: language });
      res.status(201).json({ insertId: createdLanguage.id });
    } catch (err) {
      next(err);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { code, name } = req.body;

    try {
      const updatedLanguage = await prisma.language.update({
        where: { id: parseInt(id) },
        data: { code, name },
      });

      if (updatedLanguage) {
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
      await prisma.language.delete({ where: { id: Number(req.params.id) } });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export default new LanguageController();
