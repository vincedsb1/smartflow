import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const language = await prisma.language.create({
    data: {
      code: "FR",
      name: "French",
    },
  });

  const colors = [
    "red-500",
    "orange-500",
    "yellow-500",
    "green-500",
    "teal-500",
    "blue-500",
    "indigo-500",
    "purple-500",
    "pink-500",
    "red-600",
    "orange-600",
    "yellow-600",
  ];

  let lastCreatedColor;

  for (const colorName of colors) {
    lastCreatedColor = await prisma.color.create({
      data: {
        name: colorName,
      },
    });
  }

  const categoriesData = [
    { name: "Philosophie", colorId: 1 },
    { name: "Histoire", colorId: 2 },
    { name: "Développement web", colorId: 3 },
    { name: "Économie", colorId: 4 },
    { name: "Psychologie", colorId: 5 },
    { name: "Littérature", colorId: 6 },
    { name: "Mathématiques", colorId: 7 },
    { name: "Chimie", colorId: 8 },
    { name: "Langues", colorId: 9 },
    { name: "Culture Générale", colorId: 10 },
  ];

  for (const categoryData of categoriesData) {
    try {
      await prisma.category.create({
        data: categoryData,
      });
    } catch (err) {
      console.error(err);
    }
  }

  const usersData = [
    {
      firstname: "Alice",
      lastname: "Dupont",
      email: "alice@prisma.io",
    },
    {
      firstname: "Bob",
      lastname: "Martin",
      email: "bob@prisma.io",
    },
    {
      firstname: "Charlie",
      lastname: "Johnson",
      email: "charlie@prisma.io",
    },
  ];

  for (const userData of usersData) {
    try {
      const user = await prisma.user.create({
        data: {
          ...userData,
          birthday: new Date(),
          password: await argon2.hash("passwordA123@#"),
          onBoarding: true,
          imageUrl: "https://example.com/image.jpg",
          language: {
            connect: {
              id: language.id,
            },
          },
        },
      });

      await prisma.card.create({
        data: {
          title: `Card for ${userData.firstname}`,
          answer: `Answer for ${userData.firstname}`,
          level: 1,
          lastReviewDate: new Date(),
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  await prisma.card.update({
    where: { id: 1 },
    data: { categoryId: 1 },
  });

  await prisma.card.update({
    where: { id: 2 },
    data: { categoryId: 1 },
  });

  await prisma.card.update({
    where: { id: 3 },
    data: { categoryId: 2 },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
