import { PrismaClient } from "@prisma/client";
import { seedColors } from "./colorSeed";
import { seedUsers } from "./userSeed";
import { seedCards } from "./cardSeed";
import { seedCategories } from "./categorySeed";

const prisma = new PrismaClient();

async function main() {
  // Delete all existing data
  await prisma.$executeRaw`TRUNCATE "User", "Card", "Category", "Color", "Language" RESTART IDENTITY CASCADE;`;

  const language = await prisma.language.create({
    data: {
      code: "FR",
      name: "French",
    },
  });

  // Seed colors
  console.log("Seeding colors...");
  await seedColors();
  console.log("Colors seeded successfully");

  // User creation
  const users = await seedUsers(language.id);

  // Check if users exist and have at least 3 elements
  if (users && users.length >= 3) {
    // Category creation
    await seedCategories(users);

    // Create new cards
    await seedCards(users);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
