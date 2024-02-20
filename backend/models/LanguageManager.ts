import { PrismaClient } from "@prisma/client";
import { AbstractManager } from "./AbstractManager";

const prisma = new PrismaClient();

// Define the ManagerInstance interface with tableName as string | undefined
interface ManagerInstance {
  tableName: string | undefined;
}

interface LanguageManager {
  tableName: string | undefined;
}

interface Language {
  id: number;
  code: string;
  name: string;
}

class LanguageManager extends AbstractManager {
  tableName: string | undefined;

  constructor() {
    super({ table: "language" });
    this.tableName = "language";
  }

  // Creates a new language record in the database
  async create({ code, name }: Language): Promise<void> {
    await prisma.language.create({
      data: { code, name },
    });
  }

  // Retrieves a language record from the database based on the provided id
  async read(id: number): Promise<Language | null> {
    const language = await prisma.language.findUnique({
      where: { id },
    });

    return language || null;
  }

  // Updates a language record in the database based on the provided id
  async update({ id, code, name }: Language): Promise<void> {
    await prisma.language.update({
      where: { id },
      data: { code, name },
    });
  }

  // Deletes a language record from the database based on the provided id
  async delete(id: number): Promise<void> {
    await prisma.language.delete({
      where: { id },
    });
  }
}

export default LanguageManager;
