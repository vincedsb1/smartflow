import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedCategories(users: User[]) {
  const categories = [
    { name: "Philosophie", colorId: 1, userId: users[0].id },
    { name: "Histoire", colorId: 2, userId: users[1].id },
    { name: "Développement web", colorId: 3, userId: users[2].id },
    { name: "Économie", colorId: 4, userId: users[0].id },
    { name: "Psychologie", colorId: 5, userId: users[1].id },
    { name: "Littérature", colorId: 6, userId: users[2].id },
    { name: "Mathématiques", colorId: 7, userId: users[0].id },
    { name: "Chimie", colorId: 8, userId: users[1].id },
    { name: "Langues", colorId: 9, userId: users[2].id },
    { name: "Culture Générale", colorId: 10, userId: users[0].id },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category.name,
        color: { connect: { id: category.colorId } },
        user: { connect: { id: category.userId } },
      },
    });
  }
}
