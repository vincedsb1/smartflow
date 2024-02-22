import { AbstractManager } from "./AbstractManager";
import { PrismaClient, Card as PrismaCard } from "@prisma/client";

interface Card {
  id?: number;
  title: string;
  answer: string;
  level: number;
  lastReviewDate: Date;
  userId: number;
  categoryId: number;
}

class CardManager extends AbstractManager {
  constructor() {
    super({ table: "card" });
  }

  // Create a new card
  async create(card: Card): Promise<PrismaCard> {
    return this.prisma.card.create({ data: card });
  }

  // Retrieves a card by ID
  async read(id: number): Promise<PrismaCard | null> {
    return this.prisma.card.findUnique({ where: { id } });
  }

  //Updates a card's information
  async update(card: Card): Promise<PrismaCard> {
    if (!card.id) throw new Error("ID is required to update a card.");
    return this.prisma.card.update({ where: { id: card.id }, data: card });
  }

  // Deletes a card by ID
  async delete(id: number): Promise<void> {
    await this.prisma.card.delete({ where: { id } });
  }
}

export default CardManager;
