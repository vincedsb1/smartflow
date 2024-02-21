/*
  Warnings:

  - Added the required column `notificationTime` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "notificationTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstname" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);
