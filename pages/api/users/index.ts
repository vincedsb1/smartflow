import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Créer un utilisateur
    const { email, password, firstname, lastname, birthday, onBoarding, ...otherFields } = req.body;
    try {
      const createdUser = await prisma.user.create({
        data: {
          email: email,
          password: password,
          firstname: 'Default',
          lastname: 'Default',
          birthday: new Date(),
          onBoarding: false,
          imageUrl: 'default.jpg',
          languageId: 1, 
        },
      });
      res.json(createdUser);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === 'GET') {
    
    // Récupérer un utilisateur pour la connexion
    const { email, password } = req.query;
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email as string,
          password: password as string,
        },
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === 'DELETE') {
    // Votre logique existante pour supprimer un utilisateur
    const { id } = req.query;
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: Number(id) },
      });
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else {
    res.status(405).end();
  }
}