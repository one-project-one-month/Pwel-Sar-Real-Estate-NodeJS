/*
  Warnings:

  - Added the required column `url` to the `property_photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "property_photo" ADD COLUMN     "url" TEXT NOT NULL;
