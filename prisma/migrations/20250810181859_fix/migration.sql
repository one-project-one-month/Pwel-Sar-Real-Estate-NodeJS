/*
  Warnings:

  - You are about to drop the column `cnaNumber` on the `agent_profile` table. All the data in the column will be lost.
  - You are about to drop the `user_photo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `agent_profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nrcNumber` to the `agent_profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `agent_profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_photo" DROP CONSTRAINT "user_photo_userId_fkey";

-- AlterTable
ALTER TABLE "agent_profile" DROP COLUMN "cnaNumber",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "nrcNumber" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- DropTable
DROP TABLE "user_photo";

-- CreateTable
CREATE TABLE "wishlist" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
