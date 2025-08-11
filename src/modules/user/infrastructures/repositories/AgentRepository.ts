import { prisma } from 'libs/prismaClients';
import {
  Agent,
  AgentProfileStatus,
} from 'modules/user/domain/entities/Agent.entity';
import { IAgentRepository } from 'modules/user/domain/repositories/IAgentRepository';
import { AppError, errorKinds } from 'utils/error-handling';

export class AgentRepository implements IAgentRepository {
  async createPendingAgent(params: any): Promise<Agent> {
    try {
      // const user = params.user;

      const agent = await prisma.agentProfile.create({ data: params });

      return new Agent({
        ...agent,
        status: agent.status as AgentProfileStatus,
      });
    } catch (error) {
      throw new AppError(
        errorKinds.internalServerError,
        'Failed to create pending agent',
        error as Error
      );
    }
  }

  async verifyAgent(params: any): Promise<Agent> {
    try {
      console.log(params);

      const existingAgent = await prisma.agentProfile.findUnique({
        where: { id: params.agentId },
      });

      if (!existingAgent) {
        throw AppError.new('notFound', 'Agent not found');
      }

      const agent = await prisma.agentProfile.update({
        data: {
          approvedAt: new Date(),
          approvedById: params.approvedById,
          status: params.status as AgentProfileStatus,
        },
        where: { id: params.agentId },
      });

      console.log(agent);

      return new Agent({
        ...agent,
        status: agent.status as AgentProfileStatus,
      });
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Failed to verify agent: ${error}`
      );
    }
  }
}
