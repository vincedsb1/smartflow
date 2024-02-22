import { PrismaClient, Notification as NotificationType } from "@prisma/client";
import { AbstractManager } from "./AbstractManager";

const prisma = new PrismaClient();

interface Notification extends NotificationType {}

class NotificationManager extends AbstractManager {
  constructor() {
    super({ table: "notification" });
  }

  async create({
    content,
    notificationTime,
    time,
    user,
    card,
  }: {
    content: string;
    notificationTime: Date;
    time: Date;
    user: string;
    card: string;
  }): Promise<void> {
    await prisma.notification.create({
      data: {
        content,
        notificationTime,
        time,
        user: { connect: { id: Number(user) } },
        card: { connect: { id: Number(card) } },
      },
    });
  }

  async read(id: number): Promise<Notification | null> {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    return notification || null;
  }

  async update({
    id,
    content,
    notificationTime,
  }: {
    id: number;
    content: string;
    notificationTime: Date;
  }): Promise<void> {
    await prisma.notification.update({
      where: { id },
      data: { content, notificationTime },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.notification.delete({
      where: { id },
    });
  }
}

export default NotificationManager;
