import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class NotificationController {
  async browse(req: Request, res: Response, next: NextFunction) {
    try {
      const notifications = await prisma.notification.findMany();
      res.json(notifications);
    } catch (err) {
      next(err);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const notification = await prisma.notification.findUnique({
        where: { id: Number(req.params.id) },
      });
      if (notification === null) {
        res.sendStatus(404);
      } else {
        res.json(notification);
      }
    } catch (err) {
      next(err);
    }
  }

  async browseByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const notifications = await prisma.notification.findMany({
        where: { userId: userId },
      });
      res.json(notifications);
    } catch (err) {
      next(err);
    }
  }

  
  async add(req: Request, res: Response, next: NextFunction) {
    const notification = req.body;
    try {
      const createdNotification = await prisma.notification.create({
        data: notification,
      });
      res.status(201).json({ insertId: createdNotification.id });
    } catch (err) {
      next(err);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        res.status(400).send({ error: 'Invalid notification ID' });
        return;
      }
  
      const response = await prisma.notification.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
  
      if (response) {
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
      await prisma.notification.delete({
        where: { id: Number(req.params.id) },
      });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export default new NotificationController();
