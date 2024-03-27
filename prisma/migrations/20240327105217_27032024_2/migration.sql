-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_categoryId_fkey";

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
