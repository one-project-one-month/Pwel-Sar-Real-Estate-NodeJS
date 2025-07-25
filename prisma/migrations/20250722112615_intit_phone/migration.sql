/*
  Warnings:

  - Added the required column `phone` to the `owner_profile` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `currency` on the `property` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
ALTER TYPE "PostType" ADD VALUE 'Lease';

-- AlterTable
ALTER TABLE "owner_profile" ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "property" DROP COLUMN "currency",
ADD COLUMN     "currency" INTEGER NOT NULL;
