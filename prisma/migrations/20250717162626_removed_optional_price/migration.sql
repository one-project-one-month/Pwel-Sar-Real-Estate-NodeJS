/*
  Warnings:

  - Made the column `price` on table `property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "property" ALTER COLUMN "price" SET NOT NULL;
