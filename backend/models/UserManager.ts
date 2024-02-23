import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Importing the AbstractManager module
const AbstractManager = require("./AbstractManager");

// Interface for the ManagerInstance object
interface ManagerInstance {
  tableName: string | undefined;
}

// Interface for the User object
interface User {
  firstname: string;
  lastname: string;
  birthday: Date;
  email: string;
  onBoarding: boolean;
  imageUrl?: string | null;
  languageId: number;
}

/**
 * Manages user data in the database.
 */
class UserManager extends AbstractManager {
  tableName: string | undefined;

  constructor() {
    super({ table: "user" });
    this.tableName = "user"; // Set the tableName here or through constructor parameters
  }

  // Creates a new user in the database
  async create({
    firstname,
    lastname,
    birthday,
    email,
    onBoarding,
    imageUrl = null,
    languageId,
  }: User & { password: string }): Promise<void> {
    const { password } = this;
    await prisma.user.create({
      data: {
        firstname,
        lastname,
        birthday,
        email,
        onBoarding,
        imageUrl: imageUrl || "",
        languageId: languageId,
        password,
      },
    });
  }

  // Retrieves a user by their email
  async getByMail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    return user || null;
  }

  // Retrieves a user by their ID
  async read(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user || null;
  }

  // Updates a user's information
  async update({
    id,
    firstname,
    lastname,
    birthday,
    email,
    onBoarding: onBoarding,
    imageUrl: imageUrl,
    languageId: languageId,
  }: User & { id: number }): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: {
        firstname,
        lastname,
        birthday,
        email,
        onBoarding,
        imageUrl: imageUrl || "", // provide a default value
        languageId,
      },
    });
  }

  // Deletes a user from the database
  async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  // Uploads an image for a user
  async upload(id: number, imageUrl: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { imageUrl },
    });
  }
}

export default UserManager;
