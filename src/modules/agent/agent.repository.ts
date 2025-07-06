import { injectable } from "tsyringe";
import { IAgentRepository } from "./interfaces/agent.repo.interface";
import {
  AgentRegisterRequestDto,
  AgentRegistrationApproveRequestDto,
} from "./dtos/agent.request.dto";
import { AgentProfile } from "entities";
import { prisma } from "libs/prismaClients";
import { AppError } from "utils/error-handling";
import { AgentProfileStatus } from "../../../generated/prisma";

@injectable()
export class AgentRepository implements IAgentRepository {
  async createPendingAgent(
    agent: AgentRegisterRequestDto,
    userId: number
  ): Promise<AgentProfile> {
    const matchedUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!matchedUser) {
      throw AppError.new("notFound", "No user record found.");
    }

    const newAgent = await prisma.agentProfile.create({
      data: {
        cnaNumber: agent.cnaNumber,
        licenseNumber: agent.licenseNumber,
        userId: matchedUser.id,
        status: AgentProfileStatus.Pending,
      },
    });
    return newAgent;
  }

  // approve or reject agent registration (only admins with permission)
  async approveOrRejectAgentRegistration(
    req: AgentRegistrationApproveRequestDto,
    approvingAdminId: number
  ): Promise<AgentProfile> {
    const existingAgent = await prisma.agentProfile.findUnique({
      where: { id: req.agentId },
    });

    if (!existingAgent) {
      throw AppError.new("notFound", "No registration record found.");
    }

    const adminExists = await prisma.user.findUnique({
      where: { id: approvingAdminId },
    });

    if (!adminExists) {
      throw AppError.new("notFound", "Approving admin not found.");
    }

    const updatedAgent = await prisma.agentProfile.update({
      where: { id: req.agentId },
      data: {
        status: req.status,
        approvedById: approvingAdminId,
        approvedAt: new Date(),
      },
    });

    const agentProfile = new AgentProfile({
      id: updatedAgent.id,
      userId: updatedAgent.userId,
      cnaNumber: updatedAgent.cnaNumber,
      licenseNumber: updatedAgent.licenseNumber,
      status: updatedAgent.status,
      approvedAt: updatedAgent.approvedAt,
      approvedById: updatedAgent.approvedById,
    });

    return agentProfile;
  }
}
