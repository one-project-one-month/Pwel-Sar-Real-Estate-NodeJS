/*
  Warnings:

  - You are about to drop the column `propertyId` on the `post` table. All the data in the column will be lost.
  - The `status` column on the `post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[postId]` on the table `property` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `postId` to the `property` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('Active', 'Pending', 'Sold', 'Rented');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('Sale', 'Rent', 'Lease');

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_propertyId_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "propertyId",
DROP COLUMN "type",
ADD COLUMN     "type" "PostType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "property" ADD COLUMN     "postId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "password_reset_token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_token_key" ON "password_reset_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_userId_key" ON "password_reset_token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "property_postId_key" ON "property"("postId");

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_token" ADD CONSTRAINT "password_reset_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
