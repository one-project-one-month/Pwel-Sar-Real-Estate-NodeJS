import { Agent } from 'modules/user/domain/entities/Agent.entity';

export interface IAgentRepository {
  // eslint-disable-next-line no-unused-vars
  createPendingAgent(params: any): Promise<Agent>;
  // eslint-disable-next-line no-unused-vars
  verifyAgent(params: any): Promise<Agent>;
}
