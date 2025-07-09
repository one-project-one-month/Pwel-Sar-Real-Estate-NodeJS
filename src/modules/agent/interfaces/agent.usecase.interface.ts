/* eslint-disable no-unused-vars */
import {
  AgentRegisterRequestDto,
  AgentRegistrationApproveRequestDto,
} from '../dtos/agent.request.dto';
import { AgentResponseDto } from '../dtos/agent.response.dto';

export interface IAgentUseCase {
  approveOrRejectAgentRegistrationAsync(
    agentId: number,
    req: AgentRegistrationApproveRequestDto,
    approvingAdminId: number
  ): Promise<AgentResponseDto>;
  registerAgentAsync(req: AgentRegisterRequestDto): Promise<AgentResponseDto>;
}
