import { AgentProfile } from 'entities';

import {
  AgentRegisterRequestDto,
  AgentRegistrationApproveRequestDto,
} from '../dtos/agent.request.dto';

export interface IAgentRepository {
  approveOrRejectAgentRegistration(
    agentId: number,
    req: AgentRegistrationApproveRequestDto,
    approvingAdminId: number
  ): Promise<AgentProfile>;
  createPendingAgent(
    agent: AgentRegisterRequestDto,
    userId: number
  ): Promise<AgentProfile>;
}
