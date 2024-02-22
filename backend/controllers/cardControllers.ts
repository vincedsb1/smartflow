import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CardController {
  async browse(req: Request, res: Response, next: NextFunction) {
    try {
      const cards = await prisma.card.findMany();
      res.json(cards);
    } catch (err) {
      next(err);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const card = await prisma.card.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (card === null) {
        res.sendStatus(404);
      } else {
        res.json(card);
      }
    } catch (err) {
      next(err);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const card = req.body;
    try {
      const createdCard = await prisma.card.create({ data: card });
      res.status(201).json({ insertId: createdCard.id });
    } catch (err) {
      next(err);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, answer } = req.body;
        const updatedCard = await prisma.card.update({
        where: { id: parseInt(req.params.id) },
        data: { title, answer },
      });
  
      if (updatedCard) {
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
      await prisma.card.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export default new CardController();
