import { AgentProfile } from 'entities';
import { prisma } from 'libs/prismaClients';
import { injectable } from 'tsyringe';
import { AppError } from 'utils/error-handling';

import { AgentProfileStatus } from '../../../generated/prisma';
import {
  AgentRegisterRequestDto,
  AgentRegistrationApproveRequestDto,
} from './dtos/agent.request.dto';
import { IAgentRepository } from './interfaces/agent.repo.interface';

@injectable()
export class AgentRepository implements IAgentRepository {
  // approve or reject agent registration (only admins with permission)
  async approveOrRejectAgentRegistration(
    agentId: number,
    req: AgentRegistrationApproveRequestDto,
    approvingAdminId: number
  ): Promise<AgentProfile> {
    const existingAgent = await prisma.agentProfile.findUnique({
      where: { id: agentId },
    });

    if (!existingAgent) {
      throw AppError.new('notFound', 'No registration record found.');
    }

    const adminExists = await prisma.user.findUnique({
      where: { id: approvingAdminId },
    });

    if (!adminExists) {
      throw AppError.new('notFound', 'Approving admin not found.');
    }

    const updatedAgent = await prisma.agentProfile.update({
      data: {
        approvedAt: new Date(),
        approvedById: approvingAdminId,
        status: req.status,
      },
      where: { id: agentId },
    });

    const agentProfile = new AgentProfile({
      approvedAt: updatedAgent.approvedAt,
      approvedById: updatedAgent.approvedById,
      cnaNumber: updatedAgent.cnaNumber,
      id: updatedAgent.id,
      licenseNumber: updatedAgent.licenseNumber,
      status: updatedAgent.status,
      userId: updatedAgent.userId,
    });

    return agentProfile;
  }

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
      throw AppError.new('notFound', 'No user record found.');
    }

    const newAgent = await prisma.agentProfile.create({
      data: {
        cnaNumber: agent.cnaNumber,
        licenseNumber: agent.licenseNumber,
        status: AgentProfileStatus.Pending,
        userId: matchedUser.id,
      },
    });
    return newAgent;
  }
}
