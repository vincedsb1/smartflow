import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
// import { CategoryCreateInput } from '@prisma/client'; // Add missing import

const prisma = new PrismaClient();

async function main() {
  // Delete all categories
  await prisma.category.deleteMany();

  // Delete all users
  await prisma.user.deleteMany();

  // Delete all cards
  await prisma.card.deleteMany();

  // Delete all colors
  await prisma.color.deleteMany();

  // Delete all languages
  await prisma.language.deleteMany();

  const language = await prisma.language.create({
    data: {
      code: "FR",
      name: "French",
    },
  });

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

  let lastCreatedColor;

  for (const color of colors) {
    try {
      lastCreatedColor = await prisma.color.create({
        data: color,
      });
    } catch (err) {
      console.error(`Error creating color ${color.name}:`, err);
    }
  }

  // User creation
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

  const users = [];

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

      users.push(user);

      // Create new cards
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

  // Category creation
  const categoriesData: { name: string; colorId: number; userId: number }[] = [
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

  for (const categoryData of categoriesData) {
    try {
      const user = users.find((user) => user.id === categoryData.userId);
      if (user) {
        const { userId, colorId, ...rest } = categoryData;
        await prisma.category.create({
          data: {
            ...rest,
            user: {
              connect: {
                id: user.id,
              },
            },
            color: {
              connect: {
                id: colorId,
              },
            },
          },
        });
      } else {
        console.error(`User with id ${categoryData.userId} not found.`);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
