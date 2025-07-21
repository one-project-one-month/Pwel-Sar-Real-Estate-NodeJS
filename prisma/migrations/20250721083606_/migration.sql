/*
  Warnings:

  - Added the required column `description` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "property" ALTER COLUMN "floor" DROP NOT NULL;
