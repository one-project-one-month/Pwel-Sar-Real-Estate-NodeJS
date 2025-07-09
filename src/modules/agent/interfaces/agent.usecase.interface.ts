/* eslint-disable no-unused-vars */
import {
  AgentRegisterRequestDto,
  AgentRegistrationApproveRequestDto,
} from '../dtos/agent.request.dto';
import { AgentResponseDto } from '../dtos/agent.response.dto';

export interface IAgentUseCase {
  approveOrRejectAgentRegistrationAsync(
    req: AgentRegistrationApproveRequestDto,
    agentId: number,
    approvingAdminId: number
  ): Promise<AgentResponseDto>;
  registerAgentAsync(req: AgentRegisterRequestDto): Promise<AgentResponseDto>;
}
