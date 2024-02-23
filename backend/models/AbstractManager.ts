import { PrismaClient, Prisma } from "@prisma/client";

export class AbstractManager {
  table: string;
  prisma: PrismaClient;
  
  constructor({ table }: { table: string }) {
    this.table = table;
    this.prisma = new PrismaClient();
  }

  async readAll() {
    const model = (this.prisma[this.table as keyof PrismaClient] as unknown) as {
      findMany: (options?: any) => Promise<any[]>;
    };
    
    const result = await model.findMany();
    return result;
  }
}
