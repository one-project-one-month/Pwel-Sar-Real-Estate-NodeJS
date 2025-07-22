/*
  Warnings:

  - Added the required column `updatedAt` to the `rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "property_postId_key";

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "status" SET DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "rating" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
