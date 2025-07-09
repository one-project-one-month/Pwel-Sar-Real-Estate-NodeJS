import { AgentProfile, Rating } from 'entities';
import {
  AgentRegisterRequestDto,
  AgentRegistrationApproveRequestDto,
} from '../dtos/agent.request.dto';

export interface IAgentRepository {
  createPendingAgent(
    agent: AgentRegisterRequestDto,
    userId: number
  ): Promise<AgentProfile>;
  approveOrRejectAgentRegistration(
    agentId: number,
    req: AgentRegistrationApproveRequestDto,
    approvingAdminId: number
  ): Promise<AgentProfile>;
  rateAgentAsync(req: Rating): Promise<void>;
}
