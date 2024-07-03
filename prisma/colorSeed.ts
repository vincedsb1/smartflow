import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Color = {
  id: number;
  name: string;
  fullName: string;
};

const colors: Color[] = [
  { id: 1, name: "red-500", fullName: "Rouge Vif" },
  { id: 2, name: "orange-500", fullName: "Orange Brillant" },
  { id: 3, name: "yellow-500", fullName: "Jaune Soleil" },
  { id: 4, name: "green-500", fullName: "Vert Émeraude" },
  { id: 5, name: "teal-500", fullName: "Sarcelle" },
  { id: 6, name: "blue-500", fullName: "Bleu Ciel" },
  { id: 7, name: "indigo-500", fullName: "Indigo Profond" },
  { id: 8, name: "purple-500", fullName: "Violet Royal" },
  { id: 9, name: "pink-500", fullName: "Rose Fuchsia" },
  { id: 10, name: "red-600", fullName: "Rouge Intense" },
  { id: 11, name: "orange-600", fullName: "Orange Sanguine" },
  { id: 12, name: "yellow-600", fullName: "Jaune Moutarde" },
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
