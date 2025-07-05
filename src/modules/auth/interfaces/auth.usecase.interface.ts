import { AppError } from "utils/error-handling";
import {
  AgentRegisterRequestDto,
  UserRegistrationRequestDto,
} from "../dtos/auth.request.dto";
import { AgentResponseDto } from "../dtos/auth.response.dto";
import { UserDTO } from "modules/user/applications/dtos/UserDTO";

export interface IAuthUseCase {
  registerAgentAsync(
    req: AgentRegisterRequestDto
  ): Promise<AgentResponseDto | AppError>;
  registerUserAsync(req: UserRegistrationRequestDto): Promise<UserDTO>;
}
