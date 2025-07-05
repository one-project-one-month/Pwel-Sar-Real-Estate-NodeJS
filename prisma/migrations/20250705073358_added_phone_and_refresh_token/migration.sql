/*
  Warnings:

  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(54)`.
  - A unique constraint covering the columns `[phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "phone" VARCHAR(12) NOT NULL,
ADD COLUMN     "refreshToken" TEXT NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(54);

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");
