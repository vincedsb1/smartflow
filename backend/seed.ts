import { PrismaClient } from "@prisma/client"
import argon2 from "argon2"

const prisma = new PrismaClient()

async function main() {
  const language = await prisma.language.create({
    data: {
      code: "FR",
      name: "French",
    },
  })

  const color = await prisma.color.create({
    data: {
      name: "Red",
    },
  })

  const category = await prisma.category.create({
    data: {
      name: "General",
      color: {
        connect: {
          id: color.id,
        },
      },
    },
  })

  const rule = await prisma.rule.create({
    data: {
      ruleName: "Rule 1",
      description: "Description 1",
    },
  })

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
  ]

  for (const userData of usersData) {
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
    })

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
    })

    const notification = await prisma.notification.create({
      data: {
        content: `Notification for ${user.firstname}`,
        time: new Date(),
        notificationTime: new Date(),
        user: {
          connect: {
            id: user.id,
          },
        },
        card: {
          connect: {
            id: card.id,
          },
        },
      },
    })

    const userRule = await prisma.userRule.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        rule: {
          connect: {
            id: rule.id,
          },
        },
      },
    })
  }

  console.log("Seeding finished.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })