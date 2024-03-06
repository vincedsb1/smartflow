import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import argon2 from 'argon2';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, firstname, lastname, birthday, onBoarding, ...otherFields } = req.body;

    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Veuillez entrer un email valide" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Le mot de passe doit comporter au moins 8 caractères, dont des lettres majuscules et minuscules, des chiffres et des caractères spéciaux"
      });
    }

    try {
      const hashedPassword = await argon2.hash(password);
      const createdUser = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          firstname: 'Default',
          lastname: 'Default',
          birthday: new Date(),
          onBoarding: false,
          imageUrl: 'default.jpg',
          languageId: 1,
        },
      });
      return res.json(createdUser);
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === 'GET') {
    const { email, password } = req.query;
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email as string,
        },
      });
      if (user && await argon2.verify(user.password, password as string)) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé ou mot de passe incorrect' });
      }
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: Number(id) },
      });
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}