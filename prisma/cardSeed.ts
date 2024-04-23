import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedCards(users: User[]) {
  const alice = users && users[0];
  const bob = users && users[1];
  const charlie = users && users[2];

  await prisma.card.create({
    data: {
      title: `Introduction à la théorie des couleurs`,
      answer: `La théorie des couleurs explore la manière dont les couleurs interagissent et sont perçues. Issac Newton a introduit la première théorie moderne des couleurs, distinguant les couleurs primaires et secondaires.`,
      level: 1,
      lastReviewDate: new Date(),
      active: true,
      user: {
        connect: {
          id: alice?.id,
        },
      },
    },
  });

  await prisma.card.create({
    data: {
      title: `La Révolution Industrielle`,
      answer: `La Révolution Industrielle a marqué un tournant majeur dans l'histoire, entraînant des changements sociaux, économiques et technologiques profonds. Elle a débuté au XVIIIe siècle en Angleterre et s'est étendue à travers le monde.`,
      level: 1,
      lastReviewDate: new Date(),
      active: true,
      user: {
        connect: {
          id: bob?.id,
        },
      },
    },
  });

  await prisma.card.create({
    data: {
      title: `Introduction à ReactJS`,
      answer: `ReactJS est une bibliothèque JavaScript utilisée pour construire des interfaces utilisateur interactives. Elle repose sur un concept de composants réutilisables et offre des performances élevées grâce à la virtual DOM.`,
      level: 1,
      lastReviewDate: new Date(),
      active: true,
      user: {
        connect: {
          id: charlie?.id,
        },
      },
    },
  });
}
