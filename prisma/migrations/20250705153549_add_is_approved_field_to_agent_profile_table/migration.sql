-- AlterTable
ALTER TABLE "agent_profile" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedById" INTEGER,
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "agent_profile" ADD CONSTRAINT "agent_profile_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
