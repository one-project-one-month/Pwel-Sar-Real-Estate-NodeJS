/*
  Warnings:

  - You are about to drop the `photo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `action` to the `permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resource` to the `permission` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('Admin', 'User', 'Agent');

-- DropForeignKey
ALTER TABLE "photo" DROP CONSTRAINT "photo_propertyId_fkey";

-- AlterTable
ALTER TABLE "permission" ADD COLUMN     "action" TEXT NOT NULL,
ADD COLUMN     "resource" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "role" DROP COLUMN "name",
ADD COLUMN     "name" "RoleName" NOT NULL;

-- DropTable
DROP TABLE "photo";

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "property_photo" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "property_photo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_token_key" ON "refresh_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_photo" ADD CONSTRAINT "property_photo_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
