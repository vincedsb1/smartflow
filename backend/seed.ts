import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding process...");

  const language = await prisma.language.create({
    data: {
      code: "FR",
      name: "French",
    },
  });
  console.log("Language created:", language);

  const color = await prisma.color.create({
    data: {
      name: "Red",
    },
  });
  console.log("Color created:", color);

  const category = await prisma.category.create({
    data: {
      name: "General",
      color: {
        connect: {
          id: color.id,
        },
      },
    },
  });
  console.log("Category created:", category);

  const rule = await prisma.rule.create({
    data: {
      ruleName: "Rule 1",
      description: "Description 1",
    },
  });
  console.log("Rule created:", rule);

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
    console.log("Inserting user data:", userData);

    try {
      const user = await prisma.user.create({
        data: {
          ...userData,
          birthday: new Date(),
          password: await argon2.hash("password"),
          onBoarding: true,
          imageUrl: "https://example.com/image.jpg",
          language: {
            connect: {
              id: language.id,
            },
          },
        },
      });
      console.log("User created:", user);

      const card = await prisma.card.create({
        data: {
          title: `Card for ${user.firstname}`,
          answer: `Answer for ${user.firstname}`,
          level: 1,
          lastReviewDate: new Date(),
          user: {
            connect: {
              id: user.id,
            },
          },
          category: {
            connect: {
              id: category.id,
            },
          },
        },
      });
      console.log("Card created for user:", card);

      const notificationsData = [
        {
          content: "Notification for Bob",
          time: new Date("2024-02-21T10:33:11.607Z"),
          notificationTime: new Date("2024-02-21T10:33:11.607Z"),
          userId: 6,
          cardId: 4,
        },
      ];

      for (const notificationData of notificationsData) {
        const notification = await prisma.notification.create({
          data: notificationData,
        });
        console.log("Notification created:", notification);
      }
    } catch (e) {
      console.error("Error inserting user data:", userData, e);
    }
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
