import { PrismaClient, Color as PrismaColor } from "@prisma/client";

interface Color {
  id: number;
  color_name: string;
}

class ColorManager {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Creates a new color record in the database
  async create({ color_name: colorName }: Color): Promise<PrismaColor> {
    return this.prisma.color.create({ data: { name: colorName } });
  }

  // Retrieves a color record from the database based on its ID
  async read(id: number): Promise<PrismaColor | null> {
    return this.prisma.color.findUnique({ where: { id } });
  }

  // Updates a color record in the database based on its ID
  async update({ id, color_name: colorName }: Color): Promise<PrismaColor> {
    return this.prisma.color.update({
      where: { id },
      data: { name: colorName },
    });
  }

  // Deletes a color record from the database based on its ID
  async delete(id: number): Promise<void> {
    await this.prisma.color.delete({ where: { id } });
  }
}

export default ColorManager;
