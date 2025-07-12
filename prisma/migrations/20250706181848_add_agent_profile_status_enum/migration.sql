/*
  Warnings:

  - You are about to drop the column `isApproved` on the `agent_profile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AgentProfileStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- AlterTable
ALTER TABLE "agent_profile" DROP COLUMN "isApproved",
ADD COLUMN     "status" "AgentProfileStatus" NOT NULL DEFAULT 'Pending';
