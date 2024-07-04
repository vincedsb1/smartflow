import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export async function seedUsers(languageId: number) {
  try {
    const alice = await prisma.user.create({
      data: {
        firstname: "Alice",
        lastname: "Dupont",
        email: "alice@prisma.io",
        birthday: new Date(),
        password: await argon2.hash("passwordA123@#"),
        onBoarding: true,
        imageUrl: "https://example.com/image.jpg",
        language: {
          connect: {
            id: languageId,
          },
        },
      },
    });

    const bob = await prisma.user.create({
      data: {
        firstname: "Bob",
        lastname: "Martin",
        email: "bob@prisma.io",
        birthday: new Date(),
        password: await argon2.hash("passwordA123@#"),
        onBoarding: true,
        imageUrl: "https://example.com/image.jpg",
        language: {
          connect: {
            id: languageId,
          },
        },
      },
    });

    const charlie = await prisma.user.create({
      data: {
        firstname: "Charlie",
        lastname: "Johnson",
        email: "charlie@prisma.io",
        birthday: new Date(),
        password: await argon2.hash("passwordA123@#"),
        onBoarding: true,
        imageUrl: "https://example.com/image.jpg",
        language: {
          connect: {
            id: languageId,
          },
        },
      },
    });

    return [alice, bob, charlie];
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}
