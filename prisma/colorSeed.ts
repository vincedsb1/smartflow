import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Color = {
  id: number;
  name: string;
};

const colors: Color[] = [
  { id: 1, name: "red-500" },
  { id: 2, name: "orange-500" },
  { id: 3, name: "yellow-500" },
  { id: 4, name: "green-500" },
  { id: 5, name: "teal-500" },
  { id: 6, name: "blue-500" },
  { id: 7, name: "indigo-500" },
  { id: 8, name: "purple-500" },
  { id: 9, name: "pink-500" },
  { id: 10, name: "red-600" },
  { id: 11, name: "orange-600" },
  { id: 12, name: "yellow-600" },
];

export async function seedColors() {
  for (const color of colors) {
    try {
      await prisma.color.create({
        data: color,
      });
    } catch (err) {
      console.error(`Error creating color ${color.name}:`, err);
    }
  }
}
