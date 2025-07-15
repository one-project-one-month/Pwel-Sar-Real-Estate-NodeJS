/*
  Warnings:

  - The `status` column on the `post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('Active', 'Pending', 'Sold', 'Rented');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('Sale', 'Rent');

-- AlterTable
ALTER TABLE "post" DROP COLUMN "type",
ADD COLUMN     "type" "PostType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'Pending';
