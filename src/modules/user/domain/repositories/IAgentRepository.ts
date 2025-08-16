import { Agent } from 'modules/user/domain/entities/Agent.entity';

export interface GetAgentListReturnType {
  agents: Agent[];
  totalCount: number;
}

export interface GetAllRequestType {
  limit?: number;
  page?: number;
  searchBy?: string;
  searchKeyword?: string;
}

export interface IAgentRepository {
  // eslint-disable-next-line no-unused-vars
  createPendingAgent(params: any): Promise<Agent>;
  getAllAgent(): Promise<GetAgentListReturnType>;

  // eslint-disable-next-line no-unused-vars
  verifyAgent(params: any): Promise<Agent>;
}
