import { injectable } from 'tsyringe';
import { IAgentRepository } from './interfaces/agent.repo.interface';
import {
  AgentRegisterRequestDto,
  AgentRegistrationApproveRequestDto,
} from './dtos/agent.request.dto';
import { AgentProfile, Rating } from 'entities';
import { prisma } from 'libs/prismaClients';
import { AppError, catchErrorAsync } from 'utils/error-handling';
import { AgentProfileStatus } from '../../../generated/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
      throw AppError.new('notFound', 'No user record found.');
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
      where: { id: agentId },
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

  async rateAgentAsync(rating: Rating): Promise<void> {
    // eslint-disable-next-line no-unused-vars
    const [errors, newRating] = await catchErrorAsync(
      prisma.rating.create({
        data: {
          agentId: rating.agentId,
          point: rating.point,
          userId: rating.userId,
        },
      })
    );

    if (errors) {
      switch ((errors as PrismaClientKnownRequestError).code) {
        case 'P2002':
          throw AppError.new('alreadyExist', 'Rating already exists.');
        case 'P2003':
          throw AppError.new('notFound', 'User or agent not found.');
        default:
          throw AppError.new(
            'internalErrorServer',
            'Something went wrong on the server.'
          );
      }
    }
  }
}
