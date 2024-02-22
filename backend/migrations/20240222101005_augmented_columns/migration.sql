/*
  Warnings:

  - You are about to alter the column `imageUrl` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstname" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "imageUrl" SET DATA TYPE VARCHAR(200);
