import { PrismaClient, Notification as NotificationType } from "@prisma/client";
import { AbstractManager, ManagerInstance } from "./AbstractManager";

const prisma = new PrismaClient();

interface NotificationManagerInstance extends ManagerInstance {
  tableName: "notification";
}

interface Notification extends NotificationType {}

class NotificationManager extends AbstractManager {
  constructor() {
    super({ table: "notification" });
  }

  async create({
    content,
    notification_time,
  }: {
    content: string;
    notification_time: Date;
  }): Promise<void> {
    await prisma.notification.create({
      data: { content, notification_time },
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
    notification_time,
  }: {
    id: number;
    content: string;
    notification_time: Date;
  }): Promise<void> {
    await prisma.notification.update({
      where: { id },
      data: { content, notification_time },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.notification.delete({
      where: { id },
    });
  }
}

export default NotificationManager;
