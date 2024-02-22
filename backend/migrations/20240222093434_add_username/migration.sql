/*
  Warnings:

  - You are about to alter the column `firstname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(30)`.
  - You are about to alter the column `lastname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(30)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(30)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstname" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(30);
