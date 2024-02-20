import { PrismaClient } from "@prisma/client";
import { AbstractManager } from "./AbstractManager";

const prisma = new PrismaClient();

interface ManagerInstance {
  tableName: string | undefined;
}

interface CategoryManager {
  id: number;
  name: string;
  colorId: number;
}

class CategoryManager extends AbstractManager {
  tableName: string | undefined;

  constructor() {
    super({ table: "category" });
    this.tableName = "category";
  }

  // Create a new category
  async create({ name, colorId }: CategoryManager): Promise<void> {
    await prisma.category.create({
      data: {
        name: name,
        colorId: colorId,
      },
    });
  }

  // Read a category by its ID
  async read(id: number): Promise<CategoryManager | null> {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      return null;
    }

    const categoryManager = new CategoryManager();
    categoryManager.id = category.id;
    categoryManager.name = category.name;
    categoryManager.colorId = category.colorId;

    return categoryManager;
  }

  // Update a category
  async update({ id, name, colorId }: CategoryManager): Promise<void> {
    await prisma.category.update({
      where: { id },
      data: {
        name: name,
        colorId: colorId,
      },
    });
  }

  // Delete a category by its ID
  async delete(id: number): Promise<void> {
    await prisma.category.delete({
      where: { id },
    });
  }
}

export default CategoryManager;
