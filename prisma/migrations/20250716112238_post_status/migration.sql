/*
  Warnings:

  - Changed the type of `status` on the `post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('Pending', 'Success');

-- AlterTable
ALTER TABLE "post" DROP COLUMN "status",
ADD COLUMN     "status" "PostStatus" NOT NULL;
