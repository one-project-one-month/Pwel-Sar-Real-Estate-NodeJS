import { User } from "../../../entities/index";
import { AgentProfile } from "../../../entities/index";
import {
  AgentRegisterRequestDto,
  UserRegistrationRequestDto,
} from "../dtos/auth.request.dto";

export interface IAuthRepository {
  registerUserAsync(req: UserRegistrationRequestDto): Promise<User>;
  createPendingAgent(
    agent: AgentRegisterRequestDto,
    userId: number
  ): Promise<AgentProfile>;
  approveAgentRegistration(
    agentId: number,
    approvingAdminId: number
  ): Promise<AgentProfile>;
}
