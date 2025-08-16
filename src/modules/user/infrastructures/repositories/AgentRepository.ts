import { prisma } from 'libs/prismaClients';
import {
  Agent,
  AgentProfileStatus,
} from 'modules/user/domain/entities/Agent.entity';
import { GetAllRequestType } from 'modules/user/domain/repositories';
import {
  GetAgentListReturnType,
  IAgentRepository,
} from 'modules/user/domain/repositories/IAgentRepository';
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

  async getAllAgent(
    parmas: GetAllRequestType
  ): Promise<GetAgentListReturnType> {
    try {
      const { limit = 20, page = 0 } = parmas;

      const result = await prisma.$transaction([
        prisma.agentProfile.findMany({
          include: {
            user: true,
          },
          orderBy: { createdAt: 'desc' },
          skip: page * limit,
          take: limit,

          where: this.getListFilter(parmas),
        }),
        prisma.agentProfile.count({
          where: this.getListFilter(parmas),
        }),
      ]);

      const [agents, totlaCount] = result;

      const agentUser = agents.map((agent: any) => new Agent(agent));

      return { agents: agentUser, totalCount: totlaCount };
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Failed to get all agents: ${error}`
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

  private getListFilter = (params: GetAllRequestType) => {
    const { searchBy, searchKeyword } = params;
    if (searchBy === 'username' && searchKeyword) {
      return {
        user: {
          username: {
            contains: searchKeyword,
          },
        },
      };
    } else if (searchBy && searchKeyword) {
      return {
        [searchBy]: searchKeyword,
      };
    }
    return {};
  };
}
