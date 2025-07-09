/* eslint-disable no-unused-vars */
import {
  AgentRegisterRequestDto,
  AgentRegistrationApproveRequestDto,
  RatingPayload,
} from '../dtos/agent.request.dto';
import { AgentResponseDto } from '../dtos/agent.response.dto';

export interface IAgentUseCase {
  approveOrRejectAgentRegistrationAsync(
    agentId: number,
    req: AgentRegistrationApproveRequestDto,
    approvingAdminId: number
  ): Promise<AgentResponseDto>;
  rateAgentAsync(req: RatingPayload): Promise<void>;
  registerAgentAsync(req: AgentRegisterRequestDto): Promise<AgentResponseDto>;
}
