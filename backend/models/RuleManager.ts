import { PrismaClient } from "@prisma/client";
import { AbstractManager } from "./AbstractManager";

const prisma = new PrismaClient();

// Define the ManagerInstance interface
interface ManagerInstance {
  tableName: string | undefined;
}

// Define the Rule interface
interface Rule {
  id: number;
  ruleName: string;
  description: string;
}

/**
 * Manages the CRUD operations for the "rule" table.
 */
class RuleManager extends AbstractManager {
  tableName: string | undefined;

  // Constructor for RuleManager class
  constructor() {
    super({ table: "rule" });
    this.tableName = "rule"; // Set the tableName here or through constructor parameters
  }

  // Create a new rule
  async create({
    ruleName: ruleName,
    description,
  }: {
    ruleName: string;
    description: string;
  }): Promise<void> {
    await prisma.rule.create({
      data: { ruleName, description },
    });
  }

  // Read a rule by its ID
  async read(id: number): Promise<Rule | null> {
    const rule = await prisma.rule.findUnique({
      where: { id },
    });

    return rule || null;
  }

  // Update a rule
  async update({
    id,
    ruleName,
    description,
  }: {
    id: number;
    ruleName: string;
    description: string;
  }): Promise<void> {
    await prisma.rule.update({
      where: { id },
      data: { ruleName, description },
    });
  }

  // Delete a rule by its ID
  async delete(id: number): Promise<void> {
    await prisma.rule.delete({
      where: { id },
    });
  }
}

export default RuleManager;
