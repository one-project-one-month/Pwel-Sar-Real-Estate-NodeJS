import {
  AgentRegisterRequestDto,
  AgentRegistrationApproveRequestDto,
} from "../dtos/agent.request.dto";
import { AgentResponseDto } from "../dtos/agent.response.dto";

export interface IAgentUseCase {
  registerAgentAsync(req: AgentRegisterRequestDto): Promise<AgentResponseDto>;
  approveOrRejectAgentRegistrationAsync(
    req: AgentRegistrationApproveRequestDto,
    approvingAdminId: number
  ): Promise<AgentResponseDto>;
}
